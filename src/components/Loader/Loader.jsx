import React from "react";
import styles from './Loader.module.css'
import { TailSpin } from 'react-loader-spinner'

class Loader extends React.Component {
    render(){
        return(
            <>
            <div className={styles.spinnerContainer}>
            <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                />
        </div>
            </>
        )
    }
}

export default Loader;