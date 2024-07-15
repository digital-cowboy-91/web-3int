import './PageContent.style.css';

type Props = {
    html_data: string
}

export default async function PageContent({ html_data }: Props) {

    return <section className="page-content">
        <div dangerouslySetInnerHTML={{ __html: html_data }} />
    </section>
}