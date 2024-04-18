import React, {
    createContext,
    useState,
    useEffect
} from "react";

import storage from "../storage";

const CertificationContext = createContext();

const CertificationProvider = ({ children }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const [data, setData] = useState(null);

    // TODO: Look for the async storage value instead of making the API call.
    useEffect(() => {

        storage.load({
            key: 'certData'
        }).then((data) => {
            setData(data)
        }).catch((e) => {
            console.log('error retrieving certification data', e)
        })

        // axios.get(`${apiUrl}/api/quiz/1`)
        //     .then(results => {
        //         setData(results.data)
        //     })
    }, []);

    return (<CertificationContext.Provider value={data}>
                {children}
            </CertificationContext.Provider>);
};

export { CertificationProvider, CertificationContext };