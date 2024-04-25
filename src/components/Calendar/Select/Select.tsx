import dayjs from 'dayjs';
import './Select.scss';

interface props {
	startDate: Date;
	setStartDate: React.Dispatch<React.SetStateAction<Date>>;
	setEndDate: React.Dispatch<React.SetStateAction<Date>>;
	setNewDate: (control: string, newStartDate: Date, newEndDate: Date) => void;
	setView: React.Dispatch<React.SetStateAction<'Monthly' | 'Weekly' | 'Daily'>>;
}

export default function Select({ startDate, setStartDate, setEndDate, setNewDate, setView }: props) {
	const changeView = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setView(e.currentTarget.value);
		const unit: dayjs.ManipulateType =
			e.currentTarget.value == 'Monthly' ? 'month' : e.currentTarget.value == 'Weekly' ? 'week' : 'day';

		const newStartDate = dayjs(startDate)
			.startOf(unit)
			.add(unit === 'week' ? 1 : 0, 'day')
			.toDate();
		const newEndDate = dayjs(startDate)
			.endOf(unit)
			.add(unit === 'week' ? 1 : 0, 'day')
			.toDate();

		setStartDate(newStartDate);
		setEndDate(newEndDate);

		setNewDate(e.currentTarget.value, newStartDate, newEndDate);
	};

	return (
		<div>
			<select id='view' onChange={changeView}>
				<option value='Monthly'>Monthly</option>
				<option value='Weekly'>Weekly</option>
				<option value='Daily'>Daily</option>
			</select>
		</div>
	);
}
