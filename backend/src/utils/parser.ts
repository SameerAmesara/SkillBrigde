// import { NewUser } from '../types';

// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */

// const isString = (text: any): text is string => {
//     return typeof text === 'string' || text instanceof String;
// };

// const parseName = (name: any): string => {
//     if (!name || !isString(name)) {
//         throw new Error(`Incorrect or missing name ${name}`);
//     }

//     return name;
// };


// const toNewUserEntry = (object: any): NewUser => {
//     return {
//         name: parseName(object.name),
//     };
// };

// export default toNewUserEntry;