import React from "react";
import styles from './ScrollButton.module.css'
import { BiSolidDownArrowCircle } from "react-icons/bi";

class ScrollButton extends React.Component {
    handleScrollDown = () => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      };
    render(){
        return(
            <>
            <button className={styles['scroll-down-button']} onClick={this.handleScrollDown}>
            <BiSolidDownArrowCircle  className={styles.iconScroll}/>
        </button>
            </>
        )
    }
}

export default ScrollButton;