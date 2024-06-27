import type { NativeStackScreenProps } from "@react-navigation/native-stack";


export type RootStackParamList = {

    SignUp: undefined;
    LogIn: undefined;

   };

export type SignUpScreenProps = NativeStackScreenProps<

 RootStackParamList,
 
 'SignUp'

>;

export type LogInScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LogIn'
>;
