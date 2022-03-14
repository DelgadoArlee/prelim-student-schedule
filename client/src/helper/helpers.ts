import { copyFileSync } from "fs";
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

  let result: SubjectRow =  { 
    id: subject.id,
    title: subject.title,
    lecStart: subject.Lecture.startTime,
    lecEnd: subject.Lecture.endTime,
    lecDays: mapDays(subject.Lecture.days),
   
    }

    if(subject.Lab !== null || subject.lab !== undefined){
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
    const conflicts: string[] = []
    if(arrA && arrB){
            arrA.forEach( a => {
                if(arrB.includes(a)){
                    conflicts.push(a)
                }
        })
        return conflicts.length > 0;
    }
    
    return false
}

const checkConflicts = (arrA: SubjectRow, arrB: SubjectRow) => {
    const results: boolean[] = []
    if(arrA.labDays && arrB.labDays){
        results.push(conflictingDays(arrA.labDays, arrB.labDays))
    }else if(arrA.labDays){

            results.push(conflictingDays(arrA.labDays, arrB.lecDays))
        
    }else if(arrB.labDays){
        
            results.push(conflictingDays(arrA.lecDays, arrB.labDays))
        
    }else if(conflictingDays(arrA.lecDays, arrB.lecDays)){
            results.push(conflictingDays(arrA.lecDays, arrB.lecDays))
    }


    console.log(results)
    return results.length > 0
}

const toNum = (val: string) => Number(val.replace(/\D/, ''))

const noConflict = ( a: SubjectRow, arrB: SubjectRow[]) => {
    const conflicts: boolean[] = []
    for(let i = 0; i < arrB.length; i++){
        console.log(a)
        console.log(arrB[i])
        
        if(conflictingDays(a.lecDays, arrB[i].lecDays)){
            // if(toNum(a.lecStart) < toNum(arrB[i].lecStart) && toNum(a.lecStart) >=  toNum(arrB[i].lecEnd)){
            //     conflicts.push(true)
            // }else if(toNum(a.lecStart) !== toNum(arrB[i].lecStart)){
            //     conflicts.push(true)
            // }else {
            //     conflicts.push(false)
            // }

            if(toNum(a.lecStart) >= toNum(arrB[i].lecStart) && toNum(a.lecStart) <  toNum(arrB[i].lecEnd)){
                conflicts.push(false)

            }else if(toNum(a.lecStart) < toNum(arrB[i].lecStart) && toNum(a.lecEnd) ===  toNum(arrB[i].lecEnd)){
                conflicts.push(false)

            }else if(toNum(a.lecStart) === toNum(arrB[i].lecStart)){
                conflicts.push(false)
            }else {
                conflicts.push(true)
            }
        }
        
        if(conflictingDays(a.lecDays, arrB[i].labDays)){

            if(a.labStart){

                // if(toNum(a.labStart) < toNum(arrB[i].lecStart) && toNum(a.labStart) >= toNum(arrB[i].lecEnd)){
                     
                //     conflicts.push(true)
        
                // }else if(toNum(a.labStart) !== toNum(arrB[i].lecStart)){
                //     conflicts.push(true)
                // }else{
                //     conflicts.push(false)
                // }

                if(toNum(a.labStart) >= toNum(arrB[i].lecStart) && toNum(a.labStart) < toNum(arrB[i].lecEnd)){
                    conflicts.push(false)

                }else if (toNum(a.labStart) < toNum(arrB[i].lecStart) && toNum(a.labEnd!) === toNum(arrB[i].lecEnd)){
                    conflicts.push(false)
        
                }else if(toNum(a.labStart) === toNum(arrB[i].lecStart)){
                    conflicts.push(false)
                }else{
                    conflicts.push(true)
                }
            }
    
                
            if(arrB[i].labStart ){
                // if(toNum(a.lecStart) < toNum(arrB[i].labStart!) && toNum(a.lecStart) >= toNum(arrB[i].labEnd!)){
                //     conflicts.push(true)
        
                // }else if(toNum(a.lecStart) !== toNum(arrB[i].labStart!)  ){
                //     conflicts.push(true)
                // }else{
                //     conflicts.push(false)
                // }
                
                 if(toNum(a.lecStart) >= toNum(arrB[i].labStart!) && toNum(a.lecStart) < toNum(arrB[i].labEnd!)){
                    conflicts.push(false)
        
                }else if(toNum(a.lecStart) < toNum(arrB[i].labStart!) && toNum(a.lecEnd) === toNum(arrB[i].labEnd!)){
                    conflicts.push(false)
                }else if(toNum(a.lecStart) === toNum(arrB[i].labStart!)  ){
                    conflicts.push(false)
                }else{
                    conflicts.push(true)
                }
            }
        }
           
       

        if(a.labStart  && arrB[i].labStart && conflictingDays(a.labDays, arrB[i].labDays)){
            // if(toNum(a.labStart) < toNum(arrB[i].labStart!)  && toNum(a.labStart) >= toNum(arrB[i].labEnd!)){
            //     conflicts.push(true)
    
            // }else if(toNum(a.labStart) !== toNum(arrB[i].labStart!) ){
            //     conflicts.push(true)

            // }else{
            //     conflicts.push(false)
            // }
           
             if(toNum(a.labStart) >= toNum(arrB[i].labStart!)  && toNum(a.labStart) < toNum(arrB[i].labEnd!)){
                conflicts.push(false)
    
            }else if(toNum(a.labStart) < toNum(arrB[i].labStart!) && toNum(a.labEnd!) === toNum(arrB[i].labEnd!)){
                conflicts.push(false)

            }else if(toNum(a.labStart) === toNum(arrB[i].labStart!) ){
                conflicts.push(false)

            }else{
                conflicts.push(true)
            }
        }
           

            
        
        // console.log(a)
        // console.log(arrB[i])
        // console.log(conflicts)
    }

    
    
    if(conflicts.includes(false)){
        return false
     }
     return true
    // console.log(conflicts)
    // return conflicts.includes(false)
    
}

const removeConflicts = (arrA: SubjectRow[], arrB: SubjectRow[] ) => {
    return arrA.filter(a => noConflict(a, arrB))
}

export { mapSubjectRow, mapSubjects, mapToCards, removeConflicts}
