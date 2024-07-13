import './Description.css'
import About from './about/About'
import Services from './services/Services'
import Title from './title/Title'
import ContainerViewRide from './viewRide/ContainerViewRide/ContainerViewRide'

export default function Description() {
    return (
        <main className="description container">
            <Title />
            <ContainerViewRide />
            <About />
            <Services />
        </main>
    )
}