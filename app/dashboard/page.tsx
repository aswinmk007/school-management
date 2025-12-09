"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";
import { Users, Building, GraduationCap, Megaphone, Plus, Building2, Link} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function DashboardPage() {
  const router = useRouter()
  const [totalStudents, SetTotlstudents] = useState(0)
  const [totalTeachers, SetTotalTeachers] = useState(0)
  const [totalDept,setTotalDept] = useState(0)

  useEffect(()=>{
   async function loadTotal() {
    try{
      const Students = await api.students.getAll()
      const Teachers = await api.teachers.getAll()
      const dept = await api.departments.getAll()
      SetTotlstudents(Students.length)
      SetTotalTeachers(Teachers.length)
      setTotalDept(dept.length)
    }catch(error){
      console.error("Failed to load dashboard data:", error);
    }
    
   }
   loadTotal()
  }, [])

  return (
    <>
      <h1 className='font-bold text-2xl text-white py-6 px-8 font-sans'>School Management Dashboard</h1>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card style={{border:'none'}} className="bg-slate-900 shadow-xl">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-white font-medium">Total Students</CardTitle>
              <GraduationCap className="text-[#2D9966]"/>
            </div>
          </CardHeader>
          <CardContent><h1 className="text-blue-500 text-2xl font-medium">{totalStudents}</h1></CardContent>
        </Card>
  
          <Card style={{border:'none'}} className="bg-slate-900 shadow-xl">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-white font-medium">Department</CardTitle>
              <Building className="text-[#2D9966]"/>
            </div>
          </CardHeader>
          <CardContent><h1 className="text-blue-500 text-2xl">{totalDept}</h1></CardContent>
        </Card>
  
          <Card style={{border:'none'}} className="bg-slate-900 shadow-xl">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-white font-medium">Total Teachers</CardTitle>
              <Users className="text-[#2D9966]"/>
            </div>
          </CardHeader>
          <CardContent><h1 className="text-blue-500 text-2xl">{totalTeachers}</h1></CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 p-6">
        <Card style={{border:'none'}} className="col-span-3 bg-slate-900 shadow-xl">
          <CardHeader>
             <div className="flex justify-between">
              <CardTitle className="text-white font-medium">Announcements</CardTitle>
              <Megaphone className="text-[#2D9966]"/>
            </div>
          </CardHeader>
          <CardContent>
            <div className="ml-4 space-y-1">
										<p className="text-sm font-medium leading-none text-slate-100">Sports day</p>
										<p className="text-sm text-slate-400">school sports day conduct on 23/12/25</p>

                    <p className="text-sm font-medium leading-none text-slate-100">Arts day</p>
										<p className="text-sm text-slate-400">school Arts day conduct on 16/12/25</p>

                    <p className="text-sm font-medium leading-none text-slate-100">PTA meeting</p>
										<p className="text-sm text-slate-400">School General PTA meeting is postponed</p>

                    <p className="text-sm font-medium leading-none text-slate-100">Examination</p>
										<p className="text-sm text-slate-400">Annual Examination notification is published</p>
						 </div>
          </CardContent>
        </Card>
        <Card style={{border:"none"}} className="col-span-4 bg-slate-900 shadow-xl">
					<CardHeader>
						<div className="flex justify-between">
              <CardTitle className="text-white">Quick Links</CardTitle>
              <Link className="text-[#2D9966]"/>
            </div>
					</CardHeader>
					<CardContent className="space-y-2">
						  <Button onClick={()=> router.push('/dashboard/student')} className="w-full justify-start bg-slate-800 hover:bg-slate-700">
  							<Plus className="mr-2 h-4 w-4" /> Add Student
  						</Button>
						<Button onClick={()=> router.push('/dashboard/teacher')} className="w-full justify-start bg-slate-800 hover:bg-slate-700">
							<Plus className="mr-2 h-4 w-4" /> Add Teacher
						</Button>
						<Button onClick={()=> router.push('/dashboard/Department')} className="w-full justify-start bg-slate-800 hover:bg-slate-700">
							<Building2 className="mr-2 h-4 w-4" /> Manage Departments
						</Button>
					</CardContent>
				</Card>
      </div>
    </>
   
  );
}
