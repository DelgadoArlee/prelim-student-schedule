import { Subject, SubjectCard, SubjectRow} from "../objects/objects";
import  subjectColors  from "../styles/subjectColors";


const toSubject = ( subject: any ) => {
    const result: Subject[] = []
    if(subject.Lecture){
        result.push(
            {
                id: subject.id,
                type: "LEC",
                title: subject.title,
                startTime: subject.Lecture.startTime,
                endTime: subject.Lecture.endTime,
                days: subject.Lecture.days
            }
        )
    }

    if(subject.Lab){
        result.push(
            {
                id: subject.id,
                type: "LAB",
                title: subject.title,
                startTime: subject.Lab.startTime,
                endTime: subject.Lab.endTime,
                days: subject.Lab.days
            }
        )
    }

    return result

}

const mapSubjects = (subject?: any) =>{ 
    const  result = subject.flatMap(toSubject)
      if(subject){
          return  result
      }
      return []
}  

//Convert days number to string
const convertDay = ( value: number ) => {
    let result: string = ""
    switch (value) {
        case 0 :
            result = "Sun"
            break;
        case 1 :
            result = "M"
            break;
        case 2 :
            result = "T"
            break;
        case 3 :
            result = "W"
            break;
        case 4 :
            result = "Th"
            break;
        case 5 :
            result = "F"
            break;
        case 6 :
            result = "Sat"
            break;
    }
    return result;
}

const mapDays = (arr: number[]) => arr.map(convertDay)

const subjectRow = (subject: any) => {

    console.log(subject)
  let result: SubjectRow =  { 
    id: subject.id,
    title: subject.title,
    lecStart: subject.Lecture.startTime,
    lecEnd: subject.Lecture.endTime,
    lecDays: mapDays(subject.Lecture.days),
   
    }

    if(subject.Lab != null || subject.lab != undefined){
        result = {
            ...result,
            labStart:  subject.Lab.startTime,
            labEnd: subject.Lab.endTime,
            labDays: mapDays(subject.Lab.days),
        }
    }

    return result
}

const mapSubjectRow = ( subjects?: any) => {
    if(subjects){
        return  subjects.map(subjectRow)
    }
    return []
}

// //converts Subject to Calendar event object

const toSubjectCard= (subject: Subject, color?: string, borderColor?: string ) => {
    const result: SubjectCard = {
        title: `${subject.title} - ${subject.type}`,
        startTime: subject.startTime,
        endTime: subject.endTime,
        daysOfWeek: subject.days,
        color:  color,
        borderColor: borderColor
    };
    
    return result

}
const mapToCards = ( subjects: Subject[], color?: string, borderColor?: string ) =>{
        return subjects.map((subject, index) => toSubjectCard(
            subject, (color!)? color : subjectColors[index], 
            borderColor
            ))

    
}

const conflictingDays = (arrA?: string[], arrB?: string[]) => {
    if(arrA && arrB){
        const conflicts = arrA.map( a => {
            if(arrB.includes(a)){
                return a
            }
        })
    
        return conflicts.length > 0;
    }
    
    return false
}

const checkConflicts = (arrA: SubjectRow, arrB: SubjectRow) => {
    if(arrA.labDays && arrB.labDays){
        if(conflictingDays(arrA.labDays, arrB.labDays)){
            return true;
        }
    }else if(arrA.labDays){
        if(conflictingDays(arrA.labDays, arrB.lecDays)){
            return true
        }
    }else if(arrB.labDays){
        if(conflictingDays(arrA.lecDays, arrB.labDays)){
            return true
        }
    }else if(conflictingDays(arrA.lecDays, arrB.lecDays)){
        return true
    }
    
    return false
}

const removeConflicts = (arrA: SubjectRow[], arrB: SubjectRow[] ) => {
    const result: SubjectRow[] = []

    for(let i = 0; i < arrA.length; i++){
        for(let j = 0; j < arrB.length; j++){
            if(checkConflicts(arrA[i], arrB[j])){
                if(arrA[i].labStart  && arrB[j].labStart && arrB[j].labEnd ){
                    if(arrA[i].labStart! < arrB[j].labStart! && arrA[i].labStart! >= arrB[j].labEnd!){
                        result.push(arrA[i])

                    }else if(arrA[i].labStart! != arrB[j].labStart!){
                        result.push(arrA[i])
                    }
                }
                if(arrA[i].labStart){
                    if(arrA[i].labStart! < arrB[j].lecStart! && arrA[i].labStart! >= arrB[j].lecEnd!){
                        result.push(arrA[i])

                    }else if(arrA[i].labStart != arrB[j].lecStart ){
                        result.push(arrA[i])
                    }
                }
                if(arrB[j].labStart){
                    if(arrA[i].lecStart < arrB[j].labStart! && arrA[i].lecStart >= arrB[j].labEnd!){
                        result.push(arrA[i])

                    }else if(arrA[i].lecStart != arrB[j].labStart ){
                        result.push(arrA[i])
                    }
                }
                if(arrA[i].lecStart < arrB[j].lecStart! && arrA[i].lecStart >= arrB[j].lecEnd!){
                    result.push(arrA[i])

                }else if(arrA[i].lecStart != arrB[j].lecStart ){
                    result.push(arrA[i])
                }
            }else{
                result.push(arrA[i])
            }
        }
    }
    return Array.from(new Set(result))
}

export { mapSubjectRow, mapSubjects, mapToCards, removeConflicts}
