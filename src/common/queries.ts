import { gql } from "@apollo/client";

export const GET_NUTRITION_LIST = gql`
  query GetNutritionList($sortBy: String) {
    nutritionList(sortBy: $sortBy) {
      id
      dessert
      nutritionInfo {
        calories
        fat
        carbs
        protein
      }
    }
  }
`;

export const ADD_NUTRITION = gql`
  mutation CreateNutrition($dessert: String!, $nutritionInfo: NutritionInfoInput) {
    createNutrition(dessert: $dessert, nutritionInfo: $nutritionInfo) {
      id
      dessert
      nutritionInfo {
        calories
        fat
        carbs
        protein
      }
    }
  }
`;

export const DELETE_NUTRITION = gql`
  mutation DeleteNutrition($ids: [String]) {
    deleteNutrition(ids: $ids) {
      ok
      message
    }
  }
`;

export const RESET_DATA = gql`
  mutation ResetData {
    resetData {
      ok
      message
    }
  }
`;
