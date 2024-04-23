// state.js
import { atom } from 'recoil';

export const bookingInfoState = atom({
    key: 'bookingInfoState',
    default: {
        cinema: '',
        room: '',
        selectedDate: null,
        selectedTime: '',
    },
});