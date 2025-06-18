import { useState } from 'react'
import './index.scss'

const questions = [
	{
		title: 'Какая река является самой длинной в мире?',
		variants: ['Нилл', 'Амазонка', 'Янцзы'],
		correct: 0,
	},
	{
		title: 'В какой части света расположены горы Анды?',
		variants: ['Северная Америка', 'Южная Америка', 'Азия'],
		correct: 1,
	},
	{
		title: 'Какое озеро/море является самым соленым водоёмом на земле?',
		variants: ['Каспийское море', 'Озеро Байкал', 'Мёртвое море'],
		correct: 2,
	},
	{
		title: 'Какая страна в мире занимает второе место по плащади территории?',
		variants: ['Соедененные Штаты Америки', 'Канада', 'Китай'],
		correct: 1,
	},
	{
		title: 'На каком языке говорит большинство населения Бразилии?',
		variants: ['Испанский', 'Португальский', 'Английский'],
		correct: 1,
	},
]

function Result({ correct }) {
	return (
		<div className='result'>
			<img src='https://cdn-icons-png.flaticon.com/512/2278/2278992.png' />
			<h2>
				Вы отгадали {correct} из {questions.length} ответов
			</h2>
			<a href='/'>
				<button>Попробовать снова</button>
			</a>
		</div>
	)
}

function Game({ step, question, onClickVariant }) {
	const percent = Math.round((step / questions.length) * 100)

	return (
		<>
			<div className='progress'>
				<div style={{ width: `${percent}%` }} className='progress__inner'></div>
			</div>
			<h1>{question.title}</h1>
			<ul>
				{question.variants.map((text, index) => (
					<li onClick={() => onClickVariant(index)} key={text}>
						{text}
					</li>
				))}
			</ul>
		</>
	)
}

function App() {
	const [step, setStep] = useState(0)
	const [correct, setCorrect] = useState(0)
	const question = questions[step]

	const onClickVariant = (index) => {
		setStep(step + 1)

		if (index === question.correct) {
			setCorrect(correct + 1)
		}
	}

	return (
		<div className='App'>
			{step !== questions.length ? (
				<Game step={step} question={question} onClickVariant={onClickVariant} />
			) : (
				<Result correct={correct} />
			)}
		</div>
	)
}

export default App
