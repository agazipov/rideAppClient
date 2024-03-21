import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useState, useEffect } from 'react';
import { IClient } from "../../type/interface";
import { POSITION_KEY, TABLE_HEANDING } from '../../libs/constant';
import PassengerContainer from '../passengerContainer/PassengerContainer';
import { SubmitHandler } from 'react-hook-form';
import PassengerControl from '../passengerControl/PassengerControl';

import './Passenger.css';

interface IPassengerComponent {
	clients: IClient[],
	setPassenger: SubmitHandler<IClient>,
}

const RESET_CLIENT: IClient = {
	position: 'front',
	name: '',
	phone: '',
}

export default function Passenger({ clients, setPassenger }: IPassengerComponent) {
	const [settingForm, setSettingForm] = useState<IClient | null>(null);
	
	// убирает форму при изменении полей
	useEffect(() => {
		setSettingForm(null);
	}, [clients]);

	const handleSetting = (client: IClient) => {		
		if (settingForm && client.position === settingForm.position) {
			setSettingForm(null);
			return;
		}
		setSettingForm(client);
	};

	return (
		<div style={{ display: 'flex', gap: '10px' }}>
			<Table size="sm" className='passenger__table'>
				<thead>
					<tr>
						<th>#</th>
						{TABLE_HEANDING.map((element, index) => (
							<th key={index}>{element}</th>
						))}
						<th>Настройки</th>
					</tr>
				</thead>
				<tbody>
					{clients.map((client, index) => {
						return (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{POSITION_KEY[client.position]}</td>
								<td>{client.name}</td>
								<td>{client.phone}</td>
								<td>
									<ButtonGroup size="sm">
										{(client.name && client.phone) ?
											// <Button variant="warning" onClick={() => handleSetting(client)}>chg</Button>
											<Button variant="danger" onClick={() => setPassenger({...RESET_CLIENT, position: client.position})}>Удалить</Button>
											:
											<Button variant="success" onClick={() => handleSetting(client)}>Добавить</Button>
										}
									</ButtonGroup>
								</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
			{/* {settingForm &&
				<PassengerContainer key={settingForm.position} passenger={settingForm} setPassenger={setPassenger} />
			} */}
			{settingForm &&
				<PassengerControl key={settingForm.position} passenger={settingForm} setPassenger={setPassenger} />
			}
		</div>
	)
}