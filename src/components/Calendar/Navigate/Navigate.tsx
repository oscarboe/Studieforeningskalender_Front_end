import './Navigate.scss';
import dayjs from 'dayjs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface props {
	view: 'Monthly' | 'Weekly' | 'Daily';
	startDate: Date;
	endDate: Date;
	setStartDate: React.Dispatch<React.SetStateAction<Date>>;
	setEndDate: React.Dispatch<React.SetStateAction<Date>>;
	setNewDate: (control: string, newStartDate: Date, newEndDate: Date) => void;
	date: string;
}

export default function Navigate({ view, startDate, endDate, setStartDate, setEndDate, setNewDate, date }: props) {
	const changeDate = (dir: 'next' | 'prev', longJump: boolean = false) => {
		const unit: dayjs.ManipulateType = view == 'Monthly' ? 'month' : view == 'Weekly' ? 'week' : 'day';
		const jump = longJump ? 4 : 1;

		var newStartDate = dayjs(startDate)
			.add(dir === 'next' ? jump : -jump, unit)
			.toDate();
		var newEndDate = dayjs(endDate)
			.add(dir === 'next' ? jump : -jump, unit)
			.toDate();

		setStartDate(newStartDate);
		setEndDate(newEndDate);

		setNewDate(view, newStartDate, newEndDate);
	};

	return (
		<div id='navigate'>
			<div className='double-arrow' onClick={() => changeDate('prev', true)}>
				<IoIosArrowBack />
				<IoIosArrowBack />
			</div>
			<IoIosArrowBack onClick={() => changeDate('prev')} />
			<p id='date'>{date}</p>
			<IoIosArrowForward onClick={() => changeDate('next')} />
			<div className='double-arrow' onClick={() => changeDate('next', true)}>
				<IoIosArrowForward />
				<IoIosArrowForward />
			</div>
		</div>
	);
}
