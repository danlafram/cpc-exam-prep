import React, {
    createContext,
    useState,
    useEffect
} from "react";

import axios from 'axios';

const CertificationContext = createContext();

const CertificationProvider = ({ children }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/quiz/1')
            .then(results => {
                setData(results.data)
            })
    }, []);

    return (<CertificationContext.Provider value={data}>
                {children}
            </CertificationContext.Provider>);
};

export { CertificationProvider, CertificationContext };