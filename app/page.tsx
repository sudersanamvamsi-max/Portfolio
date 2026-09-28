import PatientRiskCurve from "@/components/PatientRiskCurve";
import Photo from "@/components/Photo";
import { goals, oneLiner, passionTodo } from "@/content/site";

export default function Home() {
  return (
    <section>
      <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center md:gap-12">
        <div className="max-w-measure">
          <h1 className="text-4xl font-medium leading-tight md:text-5xl">Vamsi Sudersanam</h1>
          <p className="mt-3">{oneLiner}</p>
          <p className="mt-3">{goals}</p>
          <p className="mt-3 font-sans text-sm text-muted">TODO: {passionTodo}</p>
        </div>
        <Photo />
      </div>
      <div className="mt-10">
        <PatientRiskCurve />
      </div>
    </section>
  );
}
