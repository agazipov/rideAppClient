import './Description.css'
import Services from './services/Services'
import About from './about/About'
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