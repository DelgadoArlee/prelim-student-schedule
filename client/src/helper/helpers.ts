import { Subject, SubjectCard } from "../objects/objects";
import  subjectColors  from "../styles/subjectColors";

//converts Subject to Calendar event object
const mapToCards = ( subjects: Subject[], color?: string, borderColor?: string ) =>{
    
   return subjects.map( (subject, index) => {
        const card: SubjectCard = {
            title: subject.title,
            startTime: subject.startTime,
            endTime: subject.endTime,
            daysOfWeek: subject.days,
            allDay: subject.allDay,
            color: (color!)? color : subjectColors[index] ,
            borderColor: borderColor
        }
    
        return card;
    })
} 

export { mapToCards }
