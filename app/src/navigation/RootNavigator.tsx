import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CatalogScreen from '../screens/CatalogScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ConnectScreen from '../screens/ConnectScreen';
import { colors } from '../theme';

export type CatalogStackParamList = {
  CatalogHome: undefined;
  ProductDetail: { id: string };
};

const Tab = createBottomTabNavigator();
const CatalogStack = createNativeStackNavigator<CatalogStackParamList>();

function CatalogStackNavigator() {
  return (
    <CatalogStack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.textPrimary }}>
      <CatalogStack.Screen name="CatalogHome" component={CatalogScreen} options={{ title: 'Catalog' }} />
      <CatalogStack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product' }} />
    </CatalogStack.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.cardBorder },
          tabBarActiveTintColor: colors.gold,
          tabBarInactiveTintColor: colors.textSecondary,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Catalog" component={CatalogStackNavigator} />
        <Tab.Screen name="Connect" component={ConnectScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
