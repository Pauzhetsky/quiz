import { useState } from 'react'
import './index.scss'

const questions = [
	{
		title: 'Какая коллекция в Java гарантирует порядок элементов?',
		variants: ['HashSet', 'HashMap', 'ArrayList'],
		correct: 2,
	},
	{
		title: 'Что такое JPA?',
		variants: [
			'Java Persistence API',
			'Java Performance Architecture',
			'JSON Processing API',
		],
		correct: 0,
	},
	{
		title: 'Какое сравнение объектов предпочтительнее в Java?',
		variants: [
			'Через оператор ==',
			'Через метод equals()',
			'Через метод compare()',
		],
		correct: 1,
	},
	{
		title: 'Что такое Maven в Java-экосистеме?',
		variants: [
			'Фреймворк для тестирования',
			'Инструмент сборки и управления зависимостями',
			'Сервер приложений',
		],
		correct: 1,
	},
	{
		title: 'Какая аннотация обозначает контроллер в Spring MVC?',
		variants: ['@Service', '@Controller', '@Component'],
		correct: 1,
	},
	{
		title: 'Что такое JUnit?',
		variants: [
			'Библиотека для логирования',
			'Фреймворк для модульного тестирования',
			'Инструмент для сборки проектов',
		],
		correct: 1,
	},
	{
		title: 'Для чего используется ключевое слово finally?',
		variants: [
			'Для обязательного выполнения кода',
			'Для обработки исключений',
			'Для завершения программы',
		],
		correct: 0,
	},
	{
		title: 'Что такое Optional в Java?',
		variants: [
			'Контейнер для null-безопасных операций',
			'Аннотация для опциональных параметров',
			'Интерфейс для функционального программирования',
		],
		correct: 0,
	},
	{
		title: 'Что такое Hibernate в контексте Java?',
		variants: [
			'Фреймворк для веб-приложений',
			'ORM-фреймворк',
			'Библиотека для работы с потоками',
		],
		correct: 1,
	},
	{
		title: 'Какая аннотация используется для маппинга POST-запросов в Spring?',
		variants: ['@GetMapping', '@PostMapping', '@RequestMapping'],
		correct: 1,
	},
	{
		title: 'Для чего используется аннотация @Bean в Spring?',
		variants: [
			'Для создания бинов',
			'Для внедрения зависимостей',
			'Для конфигурации контроллеров',
		],
		correct: 0,
	},
	{
		title: 'Что такое Spring Boot?',
		variants: [
			'Модуль безопасности Spring',
			'Фреймворк для микросервисов',
			'Инструмент для быстрой настройки Spring-приложений',
		],
		correct: 2,
	},
	{
		title: 'Что такое RESTful веб-сервис?',
		variants: [
			'Сервис, использующий только HTTP GET',
			'Сервис, следующий архитектурным принципам REST',
			'Сервис с шифрованными запросами',
		],
		correct: 1,
	},
	{
		title:
			'Какой принцип SOLID гласит: "Программные сущности должны быть открыты для расширения, но закрыты для модификации"?',
		variants: [
			'Принцип единственной ответственности',
			'Принцип открытости/закрытости',
			'Принцип инверсии зависимостей',
		],
		correct: 1,
	},
	{
		title: 'Что такое Dependency Injection в Spring?',
		variants: [
			'Паттерн управления зависимостями',
			'Способ кэширования данных',
			'Метод оптимизации запросов',
		],
		correct: 0,
	},
	{
		title:
			'Какая аннотация используется для внедрения зависимостей через конструктор в Spring?',
		variants: ['@Autowired', '@Inject', '@Resource'],
		correct: 0,
	},
	{
		title: 'Для чего используется аннотация @Transactional?',
		variants: [
			'Для определения транзакций',
			'Для преобразования данных',
			'Для миграции БД',
		],
		correct: 0,
	},
	{
		title: 'Что делает ключевое слово volatile в Java?',
		variants: [
			'Обеспечивает атомарность операций',
			'Гарантирует видимость изменений между потоками',
			'Запрещает кэширование переменной',
		],
		correct: 1,
	},
	{
		title:
			'Какое исключение выбрасывается при работе с потоками, если поток был прерван?',
		variants: [
			'InterruptedException',
			'ThreadException',
			'ConcurrentModificationException',
		],
		correct: 0,
	},
	{
		title: 'Что такое Deadlock в многопоточности?',
		variants: [
			'Ошибка при синхронизации потоков',
			'Взаимная блокировка потоков',
			'Прерывание работы потока',
		],
		correct: 1,
	},
	{
		title:
			'Какой шаблон проектирования используется в Spring для создания бинов?',
		variants: ['Singleton', 'Factory Method', 'Builder'],
		correct: 1,
	},
	{
		title: 'Какая функциональность предоставляется Spring Security?',
		variants: [
			'Управление транзакциями',
			'Аутентификация и авторизация',
			'Кэширование данных',
		],
		correct: 1,
	},
	{
		title: 'Что такое Spring Cloud?',
		variants: [
			'Инструмент для облачного хранения',
			'Набор инструментов для построения облачных приложений',
			'Фреймворк для работы с Docker',
		],
		correct: 1,
	},
	{
		title: 'Какой паттерн чаще всего используется для работы с БД в Spring?',
		variants: ['Singleton', 'Repository', 'Builder'],
		correct: 1,
	},
	{
		title: 'Для чего используется ключевое слово synchronized?',
		variants: [
			'Для оптимизации кода',
			'Для синхронизации потоков',
			'Для сериализации объектов',
		],
		correct: 1,
	},
]

function Result({ correct }) {
	return (
		<div className='result'>
			<img src='./src/java.png' />
			<h2>
				Вы верно ответили на {correct} из {questions.length} ответов
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
