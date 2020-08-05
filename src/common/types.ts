import { ReactNode } from "react";

export interface NutritionInfo {
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

export interface Nutrition {
  id: string;
  dessert: string;
  nutritionInfo: NutritionInfo;
}

export interface ButtonWrapperProps {
  bg?: string;
  color?: string;
  size?: number;
}

export interface ButtonProps extends ButtonWrapperProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: (props: any) => void;
}

export interface TableProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  nutritionList: Nutrition[];
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

export interface TableHeaderProps {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface RowProps {
  head?: boolean;
}

export interface ColumnProps {
  head?: boolean;
  clickable?: boolean;
}

export interface ModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ModalWrapperProps {
  show: boolean;
}

export interface FormValuesProps {
  [key: string]: string;
}

export type useFetchVoid<T> = [
  (body?: any) => Promise<void>,
  { values: T | undefined; loading: boolean; error: string },
];
export interface UseFormProps {
  initialValues: {
    [key: string]: string;
  };
  onSubmit: (values: { [key: string]: string }) => void;
}
