import Calendar from "../calendar/Calendar";

export default function AdminPage() {
   
    return (
        <div>
            <Calendar isAdmin={true} />
        </div>
    )
}