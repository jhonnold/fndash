import { faTrophy, faMedal, faTimes } from '@fortawesome/free-solid-svg-icons';

export default placement => {
    switch (placement) {
        case 'Victory':
            return faTrophy;
        case 'Loss':
            return faTimes;
        default:
            return faMedal;
    }
};
