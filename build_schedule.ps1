param(
  [string]$OutPath = "$env:USERPROFILE\OneDrive\Desktop\Staff_Schedule_2026.xlsx"
)

$staff = @("Aini","Afrina","Amera","Chermain","Fadilah","Syukrina")
$months = @(
  @{n="June";y=2026}, @{n="July";y=2026}, @{n="August";y=2026},
  @{n="September";y=2026}, @{n="October";y=2026}, @{n="November";y=2026}, @{n="December";y=2026}
)
$days = @("Mon","Tue","Wed","Thu","Fri","Sat","Sun")

# Prefilled shift data: [Month][Week][Staff][Day] = value
$scheduleData = @{
  "June" = @{
    3 = @{
      "Aini"     = @{Mon="3-10"; Tue="10-5"; Wed="3-10"; Thu="OFF"; Fri="10-5"; Sat="OFF"; Sun="OFF"}
      "Chermain" = @{Mon="5-10"; Tue="3-10"; Wed="10-5"; Thu="5-10"; Fri="OFF"; Sat="1-6"; Sun="1-6"}
      "Amera"    = @{Mon="OFF"; Tue="5-10"; Wed="OFF"; Thu="4-10"; Fri="OFF"; Sat="OFF"; Sun="OFF"}
      "Fadilah"  = @{Mon="10-3"; Tue="OFF"; Wed="OFF"; Thu="10-4"; Fri="3-10"; Sat="OFF"; Sun="OFF"}
      "Afrina"   = @{Mon="OFF"; Tue="OFF"; Wed="OFF"; Thu="OFF"; Fri="1-6"; Sat="5-10"; Sun="10-5"}
      "Syukrina" = @{Mon="OFF"; Tue="OFF"; Wed="OFF"; Thu="OFF"; Fri="OFF"; Sat="10-5"; Sun="5-10"}
    }
  }
}

function GetShiftValue($monthName, $weekNum, $staffName, $dayName) {
  if ($scheduleData.ContainsKey($monthName) -and $scheduleData[$monthName].ContainsKey($weekNum) -and $scheduleData[$monthName][$weekNum].ContainsKey($staffName)) {
    return $scheduleData[$monthName][$weekNum][$staffName][$dayName]
  }
  return ""
}

function Esc([string]$s) {
  $s = $s -replace '&','&amp;' -replace '<','&lt;' -replace '>','&gt;'
  return $s
}

function Cell($colLetter, $row, $text, $styleIdx) {
  $ref = "$colLetter$row"
  $t = Esc($text)
  return "<c r=`"$ref`" s=`"$styleIdx`" t=`"inlineStr`"><is><t xml:space=`"preserve`">$t</t></is></c>"
}

$cols = @("A","B","C","D","E","F","G","H")

$tmp = New-Item -ItemType Directory -Path ([System.IO.Path]::Combine($env:TEMP, "xlsxbuild_$(Get-Random)")) -Force
$xl = New-Item -ItemType Directory -Path (Join-Path $tmp.FullName "xl") -Force
$xlRels = New-Item -ItemType Directory -Path (Join-Path $xl.FullName "_rels") -Force
$xlWs = New-Item -ItemType Directory -Path (Join-Path $xl.FullName "worksheets") -Force
$rootRels = New-Item -ItemType Directory -Path (Join-Path $tmp.FullName "_rels") -Force

# [Content_Types].xml
$sheetOverrides = ""
for ($i = 1; $i -le $months.Count; $i++) {
  $sheetOverrides += "<Override PartName=`"/xl/worksheets/sheet$i.xml`" ContentType=`"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml`"/>"
}
$contentTypes = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
$sheetOverrides
</Types>
"@
Set-Content -LiteralPath (Join-Path $tmp.FullName "[Content_Types].xml") -Value $contentTypes -Encoding UTF8

# _rels/.rels
$rootRelsXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>
"@
Set-Content -Path (Join-Path $rootRels.FullName ".rels") -Value $rootRelsXml -Encoding UTF8

# xl/_rels/workbook.xml.rels
$wbRelsEntries = ""
for ($i = 1; $i -le $months.Count; $i++) {
  $wbRelsEntries += "<Relationship Id=`"rId$i`" Type=`"http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet`" Target=`"worksheets/sheet$i.xml`"/>"
}
$stylesRid = $months.Count + 1
$wbRelsEntries += "<Relationship Id=`"rId$stylesRid`" Type=`"http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles`" Target=`"styles.xml`"/>"
$wbRelsXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
$wbRelsEntries
</Relationships>
"@
Set-Content -Path (Join-Path $xlRels.FullName "workbook.xml.rels") -Value $wbRelsXml -Encoding UTF8

# xl/workbook.xml
$sheetEntries = ""
for ($i = 1; $i -le $months.Count; $i++) {
  $m = $months[$i-1]
  $sheetEntries += "<sheet name=`"$($m.n) $($m.y)`" sheetId=`"$i`" r:id=`"rId$i`"/>"
}
$workbookXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheets>
$sheetEntries
</sheets>
</workbook>
"@
Set-Content -Path (Join-Path $xl.FullName "workbook.xml") -Value $workbookXml -Encoding UTF8

# xl/styles.xml -- style 0 normal, 1 title bold large, 2 subtitle italic, 3 week label bold, 4 col header bold+fill, 5 staff name bold
$stylesXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<fonts count="5">
<font><sz val="11"/><name val="Arial"/></font>
<font><b/><sz val="16"/><name val="Arial"/></font>
<font><i/><sz val="10"/><name val="Arial"/></font>
<font><b/><sz val="12"/><name val="Arial"/></font>
<font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Arial"/></font>
</fonts>
<fills count="3">
<fill><patternFill patternType="none"/></fill>
<fill><patternFill patternType="gray125"/></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FF4472C4"/><bgColor indexed="64"/></patternFill></fill>
</fills>
<borders count="2">
<border><left/><right/><top/><bottom/><diagonal/></border>
<border><left style="thin"><color rgb="FFB0B0B0"/></left><right style="thin"><color rgb="FFB0B0B0"/></right><top style="thin"><color rgb="FFB0B0B0"/></top><bottom style="thin"><color rgb="FFB0B0B0"/></bottom><diagonal/></border>
</borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="7">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
<xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>
<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>
<xf numFmtId="0" fontId="3" fillId="0" borderId="0" xfId="0" applyFont="1"/>
<xf numFmtId="0" fontId="4" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/>
<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1"/>
<xf numFmtId="49" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1"/>
</cellXfs>
</styleSheet>
"@
Set-Content -Path (Join-Path $xl.FullName "styles.xml") -Value $stylesXml -Encoding UTF8

# build each sheet
for ($si = 0; $si -lt $months.Count; $si++) {
  $m = $months[$si]
  $rows = @()
  $row = 1

  $rows += "<row r=`"$row`">$(Cell 'A' $row "$($m.n) $($m.y) - Staff Weekly Schedule" 1)</row>"
  $row++
  $rows += "<row r=`"$row`">$(Cell 'A' $row "Store Hours: 10:00 AM - 10:00 PM" 2)</row>"
  $row++
  $row++

  for ($w = 1; $w -le 4; $w++) {
    $rows += "<row r=`"$row`">$(Cell 'A' $row "Week $w" 3)</row>"
    $row++

    $cells = Cell 'A' $row "Day" 4
    for ($s = 0; $s -lt $staff.Count; $s++) {
      $cells += Cell $cols[$s+1] $row $staff[$s] 4
    }
    $rows += "<row r=`"$row`">$cells</row>"
    $row++

    foreach ($day in $days) {
      $cells = Cell 'A' $row $day 5
      for ($s = 0; $s -lt $staff.Count; $s++) {
        $val = GetShiftValue $m.n $w $staff[$s] $day
        $cells += Cell $cols[$s+1] $row $val 6
      }
      $rows += "<row r=`"$row`">$cells</row>"
      $row++
    }

    $cells = Cell 'A' $row "Total Hours" 3
    for ($s = 0; $s -lt $staff.Count; $s++) {
      $cells += Cell $cols[$s+1] $row "" 5
    }
    $rows += "<row r=`"$row`">$cells</row>"
    $row++
    $row++
  }

  $colWidths = "<cols><col min=`"1`" max=`"1`" width=`"16`" customWidth=`"1`"/><col min=`"2`" max=`"8`" width=`"13`" customWidth=`"1`"/></cols>"
  $sheetXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
$colWidths
<sheetData>
$($rows -join "`n")
</sheetData>
</worksheet>
"@
  Set-Content -Path (Join-Path $xlWs.FullName "sheet$($si+1).xml") -Value $sheetXml -Encoding UTF8
}

if (Test-Path $OutPath) { Remove-Item $OutPath -Force }
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$fs = [System.IO.File]::Open($OutPath, [System.IO.FileMode]::Create)
$archive = New-Object System.IO.Compression.ZipArchive($fs, [System.IO.Compression.ZipArchiveMode]::Create)
Get-ChildItem -LiteralPath $tmp.FullName -Recurse -File | ForEach-Object {
  $relPath = $_.FullName.Substring($tmp.FullName.Length + 1) -replace '\\','/'
  $entry = $archive.CreateEntry($relPath, [System.IO.Compression.CompressionLevel]::Optimal)
  $entryStream = $entry.Open()
  $fileBytes = [System.IO.File]::ReadAllBytes($_.FullName)
  $entryStream.Write($fileBytes, 0, $fileBytes.Length)
  $entryStream.Close()
}
$archive.Dispose()
$fs.Dispose()
Remove-Item $tmp.FullName -Recurse -Force
Write-Output "Saved: $OutPath"
