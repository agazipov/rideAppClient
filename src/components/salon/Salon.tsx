import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react";
import { IClient, Position } from "../../type/interface"
import { useForm, SubmitHandler } from "react-hook-form";
import "./salon.css"

interface ISalon {
    passengers: IClient[],
}

export default function Salon({ passengers }: ISalon) {
    return (
        <div className="salon-container">
            <div className="grid-container">
                <div className="grid-item-1"></div>
                {passengers.map((seat, index) => {
                    return (
                        <div className={`grid-item-${index + 2}`} key={index}>
                            <div className={`${seat.name ? 'busy' : 'free'}`}></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}