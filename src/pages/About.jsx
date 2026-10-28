import { Subscribe } from '../components/Layout'

export default function About() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Про нас</h1>
        </div>
      </section>
      <section className="tight">
        <div className="wrap about">
          <p className="about-lead">CrimeaVox — це медіа, яке говорить про Крим голосами кримчан.</p>
          <div>
            <p>Ми висвітлюємо життя під окупацією, переслідування кримських татар, спротив і культуру корінного народу. Пишемо для тих, хто пам'ятає Крим, і для тих, хто тільки відкриває його.</p>
            <ul className="values">
              <li><b>Перевіряємо.</b> Кожну новину підтверджуємо щонайменше двома джерелами.</li>
              <li><b>Захищаємо.</b> Не розкриваємо імена людей, яким це загрожує на окупованій території.</li>
              <li><b>Пам'ятаємо.</b> Історія — не архів, а пояснення того, що відбувається зараз.</li>
            </ul>
          </div>
        </div>
      </section>
      <Subscribe />
    </>
  )
}
