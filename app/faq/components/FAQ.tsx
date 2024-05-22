import { CMSFAQ } from "@/app/api/_cms/collections/faq";
import { notFound } from "next/navigation";
import "./FAQ.style.css";
import FAQQuestionButton from "./FAQQuestionButton";

export default async function FAQ() {
  return null;
  // const res = await CMSFAQ.readItems();

  // if (!res) notFound();

  // return (
  //   <div className="faq">
  //     <h2 className="faq__title">Frequently Asked Questions</h2>
  //     <div className="faq__items-wrapper">
  //       {res.map(({ id, answer, question }) => (
  //         <div
  //           className="faq__item"
  //           key={id}
  //           id={"faq_" + id}
  //           data-state="closed"
  //         >
  //           <FAQQuestionButton id={"faq_" + id} question={question} />

  //           <div className="faq__item__answer" data-state="closed">
  //             {answer}
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
}
