import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useState, useEffect } from 'react';
import { IClient } from "../../type/interface";
import { POSITION_KEY, TABLE_HEANDING } from '../../libs/constant';
import PassengerContainer from '../passengerContainer/PassengerContainer';
import { SubmitHandler } from 'react-hook-form';

interface IPassengerComponent {
	client: IClient[],
	setPassenger: SubmitHandler<IClient>,
}

export default function Passenger({ client, setPassenger }: IPassengerComponent) {
	const [settingForm, setSettingForm] = useState<IClient | null>(null);

	// убирает форму при изминении полей
	useEffect(() => {
		setSettingForm(null);
	}, [client]);

	const handleSetting = (client: IClient) => {		
		if (settingForm && client.position === settingForm.position) {
			setSettingForm(null);
			return;
		}
		setSettingForm(client);
	};

	return (
		<div style={{ display: 'flex', gap: '10px' }}>
			<Table size="sm">
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
					{client.map((seat, index) => {
						return (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{POSITION_KEY[seat.position]}</td>
								<td>{seat.name}</td>
								<td>{seat.phone}</td>
								<td>
									<ButtonGroup size="sm">
										{(seat.name && seat.phone) ?
											<Button variant="warning" onClick={() => handleSetting(seat)}>chg</Button>
											:
											<Button variant="success" onClick={() => handleSetting(seat)}>add</Button>
										}
										<Button variant="danger" onClick={() => { }}>del</Button>
									</ButtonGroup>
								</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
			{settingForm &&
				<PassengerContainer key={settingForm.position} passenger={settingForm} setPassenger={setPassenger} />
			}
		</div>
	)
}