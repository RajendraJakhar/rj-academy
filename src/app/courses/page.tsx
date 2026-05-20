"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function CoursesPage() {
  const router = useRouter()
      
  const courses = [
    {
      title: "NEET Ultimate Batch",
      subtitle: "Physics • Chemistry • Biology",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    },

    {
      title: "JEE Advanced Batch",
      subtitle: "PCM Full Course",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },

    {
      title: "AI & Data Science",
      subtitle: "Python • AI • ML",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    },
  ]

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* Header */}
      <div className="flex items-center gap-4">

        <button 
          className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl"
          onClick={() => router.back()}
        >
          ←
        </button>

        <div>

          <h1 className="text-4xl font-bold">
            Premium Courses
          </h1>

          <p className="text-purple-400 tracking-[4px] mt-1">
            RJ ACADEMY
          </p>

        </div>

      </div>

      {/* Courses */}
      <div className="mt-10 space-y-8">

        {courses.map((course) => (

          <Link
            href="/subjects"
            key={course.title}
          >

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-purple-500 transition-all">

              {/* Image */}
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-60 object-cover"
              />

              {/* Content */}
              <div className="p-5">

                <h2 className="text-3xl font-bold">
                  {course.title}
                </h2>

                <p className="text-zinc-400 mt-2">
                  {course.subtitle}
                </p>

                <button 
                  className="mt-5 w-full bg-purple-600 hover:bg-purple-700 transition-all p-4 rounded-2xl font-bold"
                  onClick={() => router.push("/subjects")}
                  >
                  Explore Course
                </button>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </main>
  )
}