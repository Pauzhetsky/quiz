import { useState } from 'react'
import './index.scss'
import javaImage from './java.png'

const questions = [
	{
		title:
			'Какое условие может вызвать "странное" поведение в `HashMap` при использованию mutable-ключей, даже если hashCode() переопределён корректно?',
		variants: [
			'Изменение поля, не участвующего в equals()/hashCode()',
			'Коллизия хеш-кодов после изменения ключа',
			'Нарушение инварианта: !key.equals(new Key) при совпадении bucket-индекса',
		],
		correct: 2,
	},
	{
		title:
			'Что произойдёт при вызове `ThreadPoolExecutor` с corePoolSize=5, maxPoolSize=10, queueCapacity=100 после 115 задач?',
		variants: [
			'RejectedExecutionException для 116-й задачи',
			'Создание 10 потоков и 105 задач в очереди',
			'Увеличение очереди до 115 задач без новых потоков',
		],
		correct: 0,
	},
	{
		title: 'Почему `Arrays.asList(array).remove(0)` выбросит исключение?',
		variants: [
			'List фиксированного размера',
			'Массивы примитивов не поддерживают remove()',
			'Контракт List запрещает remove() в итераторе без hasNext()',
		],
		correct: 0,
	},
	{
		title: 'Как влияет finalize() на время жизни объекта в поколении Old Gen?',
		variants: [
			'Объект перемещается в Finalization Queue',
			'Увеличивает минимум на 2 GC-цикла',
			'Запрещает перемещение в Survivor Space',
		],
		correct: 1,
	},
	{
		title: 'Чем опасен `synchronized` на `Integer.valueOf(1)`?',
		variants: [
			'Autoboxing создаёт новый объект',
			'Integer кэширует значения только до 127',
			'JIT может оптимизировать монитор',
		],
		correct: 1,
	},
	{
		title:
			'Почему `((Object) new int[]{1,2}) instanceof List` возвращает false?',
		variants: [
			'Массивы не реализуют List',
			'instanceof проверяет только класс',
			'Автоупаковка не применяется к массивам',
		],
		correct: 0,
	},
	{
		title:
			'Какая оптимизация JIT может сломать код `while (!flag)` в другом потоке?',
		variants: [
			'Lock Coarsening',
			'Loop Unrolling',
			'Hoisting чтения из памяти',
		],
		correct: 2,
	},
	{
		title: 'Что нарушает контракт `java.util.concurrent.atomic.LongAdder`?',
		variants: [
			'Нет гарантий атомарности sum()',
			'Не поддерживает compareAndSet()',
			'Может терять обновления при contention',
		],
		correct: 0,
	},
	{
		title: 'Почему `MethodHandle` быстрее Reflection?',
		variants: [
			'Нет проверок доступа в runtime',
			'JIT компилирует вызовы напрямую',
			'Использует intrinsic-оптимизации',
		],
		correct: 1,
	},
	{
		title: 'Как `ForkJoinPool` обрабатывает задачи с блокирующими вызовами?',
		variants: [
			'Compensated Threading',
			'Work-Stealing с блокировкой воркеров',
			'Degrades to ThreadPerTask',
		],
		correct: 0,
	},
	{
		title: 'Что нарушает Liskov Substitution в Java Streams?',
		variants: [
			'`sorted().distinct()` vs `distinct().sorted()`',
			'Побочные эффекты в `peek()`',
			'`flatMap` с stateful-лямбдой',
		],
		correct: 2,
	},
	{
		title: 'Почему `var` нельзя использовать для лямбд?',
		variants: [
			'Тип лямбды - функциональный интерфейс',
			'Невозможность вывода типа',
			'Дезориентация компилятора',
		],
		correct: 1,
	},
	{
		title: 'Как `WeakHashMap` обрабатывает коллизии при сборке ключей?',
		variants: [
			'Удаляет весь bucket',
			'Перестраивает цепочку Entry',
			'Игнорирует до следующего put()',
		],
		correct: 1,
	},
	{
		title: 'Чем опасен `Unsafe.allocateInstance()` для `String`?',
		variants: [
			'Обход final-полей',
			'Создание строк без кодировки',
			'Наружение инварианта `hash != 0`',
		],
		correct: 0,
	},
	{
		title:
			'Почему `Optional.of(null)` кидает NPE, а `Optional.ofNullable(null)` нет?',
		variants: [
			'Контракт of() требует non-null',
			'ofNullable() использует unsafe',
			'JLS запрещает null в generic-типах',
		],
		correct: 0,
	},
	{
		title: 'Какая проблема в `Double.compare(0.0, -0.0)`?',
		variants: [
			'Возвращает 0 вместо 1',
			'Нарушает контракт compare()',
			'Считает их равными',
		],
		correct: 2,
	},
	{
		title: 'Как `ClassLoader` нарушает делегирование для SPI?',
		variants: [
			'Thread Context ClassLoader',
			'Игнорирование parent-first',
			'Динамическое обновление классов',
		],
		correct: 0,
	},
	{
		title:
			'Почему `Collections.synchronizedList().iterator()` требует ручной синхронизации?',
		variants: [
			'Fail-fast итератор',
			'Отсутствие атомарности next()',
			'Несинхронизированный hasNext()',
		],
		correct: 1,
	},
	{
		title: 'Как `VarHandle` обеспечивает атомарность для `long` в 32-bit JVM?',
		variants: [
			'Через разделение на 2 int',
			'Использует CAS-инструкции CPU',
			'Только с `@Contended` аннотацией',
		],
		correct: 1,
	},
	{
		title: 'Что делает `-XX:+UseCompressedOops` с `Object[]`?',
		variants: [
			'Заменяет ссылки на 32-битные',
			'Упаковывает примитивы в массиве',
			'Использует off-heap память',
		],
		correct: 0,
	},
	{
		title:
			'Почему `try-with-resources` требует `AutoCloseable`, а не `Closeable`?',
		variants: [
			'Поддержка suppressed исключений',
			'Избегание конфликта с legacy-кодом',
			'Closeable бросает только IOException',
		],
		correct: 2,
	},
	{
		title: 'Как `CompletableFuture.thenCompose()` отличается от `thenApply()`?',
		variants: [
			'Разворачивает вложенные Future',
			'Гарантирует асинхронное выполнение',
			'Поддерживает бинарные функции',
		],
		correct: 0,
	},
	{
		title: 'Чем опасен `Pattern.compile()` в статическом инициализаторе?',
		variants: [
			'Рекурсивная загрузка классов',
			'Блокировка PermGen/Metaspace',
			'Инициализация NIO Charset',
		],
		correct: 1,
	},
	{
		title:
			'Почему `System.identityHashCode()` может совпадать для разных объектов?',
		variants: [
			'31-битное хеширование',
			'Переполнение адресного пространства',
			'Коллизии в таблице хешей',
		],
		correct: 0,
	},
	{
		title: 'Как `@Contended` предотвращает false sharing?',
		variants: [
			'Добавление padding-байтов',
			'Перемещение в off-heap',
			'Использование CPU-local memory',
		],
		correct: 0,
	},
	{
		title: 'Почему `Thread.yield()` не гарантирует паузу?',
		variants: [
			'Зависит от планировщика ОС',
			'Только для кооперативных потоков',
			'Не влияет на состояние монитора',
		],
		correct: 0,
	},
	{
		title: 'Что нарушает `java.util.ServiceLoader` при модульной системе?',
		variants: [
			'Требует `uses` в module-info',
			'Игнорирует `provides`',
			'Динамическое разрешение модулей',
		],
		correct: 0,
	},
	{
		title: 'Как `ByteBuffer.allocateDirect()` влияет на GC?',
		variants: [
			'Вызывает full GC для очистки',
			'Использует phantom references',
			'Обходит Young Gen',
		],
		correct: 1,
	},
	{
		title: 'Почему `Enum.values()` возвращает клон массива?',
		variants: [
			'Защита от модификации констант',
			'Thread-safety при итерации',
			'Избегание утечек памяти',
		],
		correct: 0,
	},
	{
		title: 'Чем отличается `invokedynamic` от `invokevirtual` для лямбд?',
		variants: [
			'Отложенная линковка call site',
			'Использование MethodHandles',
			'Поддержка default-методов',
		],
		correct: 0,
	},
]

function Result({ correct }) {
	return (
		<div className='result'>
			<img src={javaImage} alt='java logo' />
			<h2>
				Вы верно ответили на {correct} из {questions.length} вопросов
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
