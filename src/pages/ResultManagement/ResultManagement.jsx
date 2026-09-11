import {
  CheckCircle,
  Clock3,
  Download,
  Eye,
  Send,
  Users,
} from "lucide-react";
import {
  Table,
  Tag,
  Button,
  Input,
  Select,
  Modal,
  Form,
  InputNumber,
} from "antd";

import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
const ResultManagement = () => {


  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [form] = Form.useForm();



  const data = [
    {
      key:1,
      name:"Sakib Ahmed",
      id:"429535",
      class:"One",
      exam:"Half Yearly",
      marks:"450 / 500",
      grade:"A+",
      status:"Completed"
    },
    {
      key:2,
      name:"Sharif Hasan",
      id:"212580",
      class:"One",
      exam:"Half Yearly",
      marks:"390 / 500",
      grade:"A",
      status:"Completed"
    },
    {
      key:3,
      name:"Afnat Rahman",
      id:"759546",
      class:"Two",
      exam:"Half Yearly",
      marks:"285 / 500",
      grade:"B",
      status:"Completed"
    },
    {
      key:4,
      name:"Daud Khan",
      id:"697130",
      class:"Two",
      exam:"Half Yearly",
      marks:"-",
      grade:"-",
      status:"Pending"
    }
  ];





  const openResultModal=(record)=>{

    setSelectedStudent(record);

    setOpenModal(true);


    form.setFieldsValue({

      studentName:record.name,
      studentId:record.id,
      class:record.class,
      exam:record.exam

    });

  };







const columns=[


{
 title:"#",
 dataIndex:"key",
 width:60,
},



{
 title:"Name",
 dataIndex:"name",

 render:(name)=>(

 <div className="flex items-center gap-3">


 <div

 className="
 w-10
 h-10
 rounded-full
 bg-gradient-to-r
 from-brand-primary
 to-brand-accent
 flex
 items-center
 justify-center
 text-white
 font-bold
 "

 >

 {name.charAt(0)}

 </div>


 <span className="font-semibold">

 {name}

 </span>


 </div>

 )

},





{
 title:"Student ID",
 dataIndex:"id"
},




{
 title:"Class",
 dataIndex:"class",

 render:(value)=>(

 <span

 className="
 bg-purple-soft
 text-brand-secondary
 px-3
 py-1
 rounded-lg
 "

 >

 {value}

 </span>

 )

},




{
 title:"Exam",
 dataIndex:"exam"
},




{
 title:"Marks",
 dataIndex:"marks",

 render:(value)=>(

 <span className="font-semibold">

 {value}

 </span>

 )

},




{
 title:"Grade",
 dataIndex:"grade",

 render:(value)=>(

 <Tag

 color="green"

 className="rounded-full px-3"

 >

 {value}

 </Tag>

 )

},




{
 title:"Status",
 dataIndex:"status",

 render:(value)=>(

 value==="Completed"

 ?

 <Tag color="green">
 ● Completed
 </Tag>

 :

 <Tag color="orange">
 ● Pending
 </Tag>

 )

},




{
 title:"Action",

 fixed:"right",

 render:(_,record)=>(


 <Button

 onClick={()=>openResultModal(record)}

 className="
 border-purple-400
 text-brand-secondary
 rounded-xl
 "

 >

 {

 record.status==="Completed"
 ?
 "Edit"
 :
 "Add"

 }


 </Button>


 )

}


];






return (

<div className="
space-y-6
font-urbanest
[&_*]:font-urbanest
">


<div

className="
flex
flex-col
lg:flex-row
justify-between
gap-4
"

>


<div>


<h1

className="
text-3xl
font-bold
text-text-primary
"

>

Result Management

</h1>



<p className="text-text-secondary">

Set individual student results and send to all with one click

</p>


</div>





<div className="flex gap-3">


<Button

icon={<Eye size={18}/>}

className="rounded-xl h-11"

>

Preview

</Button>




<Button

icon={<Send size={18}/>}

className="
rounded-xl
h-11
text-white
bg-gradient-to-r
from-brand-primary
to-brand-accent
border-none
"

>

Send Results To All

</Button>



</div>



</div>





<div

className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-5
"

>


<Stat
icon={<Users/>}
title="120"
text="Total Students"
/>


<Stat
icon={<CheckCircle/>}
title="108"
text="Results Added"
/>


<Stat
icon={<Clock3/>}
title="12"
text="Pending Results"
/>


<Stat
icon={<Send/>}
title="-"
text="Last Sent"
/>



</div>





<div

className="
rounded-[28px]
border
border-border
bg-surface-soft/80
backdrop-blur-xl
p-4
md:p-6
shadow-[0_20px_60px_rgba(91,33,182,0.10)]
"

>


<div

className="
flex
flex-col
md:flex-row
gap-3
mb-5
"

>


<Input

placeholder="Search by name, ID or phone"

prefix={<SearchOutlined/>}

className="h-11 rounded-xl"

/>



<Select

placeholder="All Classes"

className="md:w-48 h-11"

/>




<Select

placeholder="All Exams"

className="md:w-48 h-11"

/>




<Button

icon={<Download/>}

className="
rounded-xl
bg-gradient-to-r
from-brand-primary
to-brand-accent
text-white
"

>

Export

</Button>



</div>




<Table

columns={columns}

dataSource={data}

pagination={{
pageSize:10
}}

scroll={{
x:1100
}}

className="
font-urbanest
[&_*]:font-urbanest
"

/>



</div>

{/* RESULT MODAL */}


<Modal

open={openModal}

onCancel={()=>setOpenModal(false)}

footer={null}

width={750}

centered

className="
font-urbanest
[&_*]:font-urbanest
"

>


<div>


<h2

className="
text-2xl
font-bold
text-text-primary
"

>

{

selectedStudent?.status==="Completed"

?

"Edit Result"

:

"Add Result"

}

</h2>



<p className="
text-text-secondary
mb-6
">

Enter student subject wise marks

</p>





<Form

form={form}

layout="vertical"

>


<div

className="
grid
grid-cols-1
md:grid-cols-2
gap-4
"

>


<Form.Item

label="Student Name"

name="studentName"

>

<Input disabled />

</Form.Item>



<Form.Item

label="Student ID"

name="studentId"

>

<Input disabled />

</Form.Item>




<Form.Item

label="Class"

name="class"

>

<Input disabled />

</Form.Item>




<Form.Item

label="Exam"

name="exam"

>

<Input disabled />

</Form.Item>



</div>







<h3

className="
font-bold
text-lg
mb-4
"

>

Subject Marks

</h3>





{
[
"Bangla",
"English",
"Math",
"Science"
]
.map((subject)=>(


<div

key={subject}

className="
grid
grid-cols-2
gap-4
mb-3
"

>


<div

className="
rounded-xl
bg-purple-soft
px-4
py-3
font-semibold
"

>

{subject}

</div>



<InputNumber

placeholder="Enter Marks"

className="
w-full
h-11
"

/>


</div>


))

}







<div

className="
grid
grid-cols-1
sm:grid-cols-3
gap-4
mt-6
"

>


<div

className="
rounded-2xl
bg-purple-soft
p-4
"

>

<p className="text-sm">

Total Marks

</p>


<h3 className="font-bold text-xl">

450 / 500

</h3>


</div>






<div

className="
rounded-2xl
bg-green-100
p-4
"

>

<p className="text-sm">

Grade

</p>


<h3 className="font-bold text-xl">

A+

</h3>


</div>






<div

className="
rounded-2xl
bg-blue-100
p-4
"

>

<p className="text-sm">

GPA

</p>


<h3 className="font-bold text-xl">

5.00

</h3>


</div>



</div>








<div

className="
flex
justify-end
gap-3
mt-6
"

>


<Button

onClick={()=>setOpenModal(false)}

className="
rounded-xl
"

>

Cancel

</Button>




<Button

onClick={()=>{

console.log("Result Saved");

setOpenModal(false);

}}

className="
rounded-xl
border-none
text-white
bg-gradient-to-r
from-brand-primary
to-brand-accent
"

>

Save Result

</Button>



</div>




</Form>


</div>


</Modal>



</div>

)

}








const Stat=({icon,title,text})=>(


<div

className="
font-urbanest
[&_*]:font-urbanest
rounded-[24px]
border
border-border
bg-surface-soft/80
p-5
shadow-[0_15px_40px_rgba(91,33,182,0.08)]
"

>


<div className="text-brand-secondary">

{icon}

</div>



<h2

className="
text-2xl
font-bold
mt-3
"

>

{title}

</h2>




<p

className="
text-text-secondary
text-sm
"

>

{text}

</p>



</div>


)





export default ResultManagement;