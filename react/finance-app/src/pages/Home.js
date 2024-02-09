import Header from '../components/Header'

export default function Home() {
    return (
        <>
            <Header />
            <a href="/transactions">Home</a>
            <p></p>
            <a href="/graphs">Graphs</a>
            <p></p>
            <a href="/transactions">Transactions</a>
        </>
    )
}