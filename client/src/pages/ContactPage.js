import React from "react";
import MainImage from "../components/MainImage";
import NavBar from "../components/NavBar";

const ContactPage = () => {

    return(
        <div className="App">
            <NavBar imageLink="./images/glass.png"/>
            <div>
                <span>
                운영 시간: 00:00 ~ 23:59<br/>
                연락처: 010-1111-2222<br/>
                문의: junggonara@kw.ac.kr<br/>
                책임자: 누군가<br/>
                </span>
                <br/>
                <span
                style={{
                    "font-weight": "bold"
                }}
                >since 2022.05.28</span>
            </div>

        </div>
    );
}

export default ContactPage;