import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (key: string): Promise<any | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

export const updateData = async (key: string, newValue: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(newValue));
  } catch (e) {
    console.log(e);
  }
};
