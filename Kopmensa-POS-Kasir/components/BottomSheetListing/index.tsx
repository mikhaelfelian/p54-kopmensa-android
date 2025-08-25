import "react-native-gesture-handler";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import BottomSheet from "@devvie/bottom-sheet";
import { colors } from "@/constants/constants";

interface CommonProps<T> {
  sheetRef: React.RefObject<any>;
  title: string;
  listItem: T[];
  itemKey: (keyof T)[];
  onSelectItem: (item: T) => void;
}

interface SearchEnabledProps<T> extends CommonProps<T> {
  isSearchQuery: true;
  textQuery: string;
  onQueryTextChange: (text: string) => void;
}

interface SearchDisabledProps<T> extends CommonProps<T> {
  isSearchQuery?: false;
  textQuery?: never;
  onQueryTextChange?: never;
}

type BottomSheetListingProps<T> = SearchEnabledProps<T> | SearchDisabledProps<T>;

const BottomSheetListing = <T extends Record<string, any>>({ sheetRef, title, isSearchQuery = false, textQuery, onQueryTextChange, listItem, itemKey, onSelectItem }: BottomSheetListingProps<T>) => {
  return (
    <BottomSheet ref={sheetRef} style={{ backgroundColor: colors.light }}>
      <View style={styles.bottomSheetContainer}>
        <Text style={styles.bsTitle}>{title}</Text>

        {isSearchQuery && (
          <View style={styles.searchFieldContainer}>
            <Ionicons name="search-circle-outline" color="black" size={15} />
            <TextInput style={styles.searchField} value={textQuery} onChangeText={onQueryTextChange} placeholder="Search" placeholderTextColor={colors.gray4} />
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false}>
          {listItem.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => onSelectItem(item)}>
              <View style={styles.bsItemLabel}>
                <Text style={styles.descriptionText}>{itemKey.length > 1 ? `${item[itemKey[0]]} - ${item[itemKey[1]]}` : item[itemKey[0]]}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

export default BottomSheetListing;
