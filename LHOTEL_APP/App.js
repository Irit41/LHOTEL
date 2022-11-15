import Router from './Pages/Navigation/Router'
import { LogBox } from 'react-native'
import ignoreWarnings from 'ignore-warnings';
import { useState } from "react";
import AppContext from './AppContext';
import moment from "moment";
import Modal from "react-native-modal";

export default function App() {
  
 
  const isIos = Platform.OS === 'ios'
  const [isUserExist, setIsUserExist] = useState(false);
  const [rooms_flags, SetRooms_flags] = useState({
    "Single room": 0,
    "Double room": 0,
    "Suite": 0
  });
  const [products, SetProducts] = useState([]);
  const [employees, SetEmployees] = useState([]);
  const [roomServiceEmpView, SetRoomServiceEmpView] = useState([]);

  
  const [roomsReservation, SetRoomsReservation] = useState({
    CustomerID: '',
    CustomerType: 1,
    FirstName: '',
    LastName: '',
    Mail: '',
    PhoneNumber: '',
    CardHolderName: '',
    CreditCardNumber: '',
    CreditCardDate: '',
    ThreeDigit: '',
    AmountOfPeople: 1,
    EmployeeID: -1,
    CounterSingle: 0,
    CounterDouble: 0,
    CounterSuite: 0,
    EntryDate: moment().toDate(),
    ExitDate: moment().add(1, "days").toDate(),

    Breakfast: false,
    NumberOfNights: 0,
    totalSum: 0,
    rooms: []
  }
  );
  const [bill, SetBill] = useState({

    CustomerID: '',
    BillNumber: 0,
    BillDate: '',
    AmountOfPeople: 0,
    Breakfast: false,
    NumberOfNights: 0,
    CustomerType: 1,
    EntryDate: moment().toDate(),
    ExitDate: moment().add(1, "days").toDate(),
    FirstName: '',
    LastName: '',
    Mail: '',
    PhoneNumber: '',
    rooms: []

  }
  );

  const [employee, setEmployee] = useState({});
  const [user, SetUser] = useState({})

  const setEmployeeDB = (obj) => {
    setEmployee(obj)
  }

  const setUserDB = (obj) => {
    SetUser(obj)
  }


  const SetReservastionData = (obj) => {
    SetRoomsReservation(obj)
  }


  const userSettings = {
    employee: employee,
    user: user,
    isUserExist: isUserExist,
    isIos: isIos,
    bill: bill,
    rooms_flags:rooms_flags,
    roomsReservation: roomsReservation,
    employees:employees,
    roomServiceEmpView:roomServiceEmpView,
    setEmployeeDB,
    setUserDB,
    setIsUserExist,
    SetBill,
    SetReservastionData,
    SetRooms_flags,
    SetEmployees,
    SetRoomServiceEmpView
   
  };

  ignoreWarnings('warn', ['ViewPropTypes', '[react-native-gesture-handler]'])

  LogBox.ignoreLogs([
    'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
    'NativeBase: The contrast ratio of',
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ])



  return (
    <AppContext.Provider value={userSettings}>
      <Router />
    </AppContext.Provider>

  );
}