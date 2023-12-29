
const About = () => {
    return(
        <div id="about" className=" flex flex-col justify-center">
            <div className=' mt-10'>
                <h2  className="text-4xl font-extrabold dark:text-white text-center">Discover Our <span className='text-purple-500'> Story </span></h2>
                <p className="my-4 text-lg text-gray-500 w-2/3 text-center m-auto">Embark on a journey with us as we unfold the narrative behind our passion and purpose. Explore 'Discover Our Story' to understand the heart and soul of what drives us forward..</p>
            </div>
            <div className=" flex sm:flex-row flex-col gap-10 justify-center items-center flex-col-reverse">
                <div className="w-1/3">
                    <img src="prologue.png" alt="prologue" />
                </div>
                <div className="sm:w-1/2 p-3">
                    <h3 class="text-3xl font-bold mb-3 text-center">Prologue</h3>
                    <p className="text-center text-gray-500">InfinityScriptCV was founded to address a major challenge: how to create a resume that stands out from the crowd and showcases your unique skills and achievements. With InfinityScriptCV, you can easily generate a professional and customized resume that highlights your strengths and matches the requirements of your desired job. Whether you are looking for a career change, a promotion, or a new opportunity, InfinityScriptCV can help you craft the perfect resume that will impress any employer.</p>
                </div>
            </div>
            <div className=" flex sm:flex-row sm:flex-row-reverse flex-col flex-col-reverse gap-10 justify-center items-center">
                <div className="w-1/3">
                    <img src="chapterOne.png" alt="" />
                </div>
                <div className="sm:w-1/2 p-3">
                    <h3 class="text-3xl font-bold mb-3 text-center">Chapter One</h3>
                    <p className="text-center text-gray-500">InfinityScriptCV is a resume generator website that helps you create professional and personalized CVs in minutes. The idea behind InfinityScriptCV was born in 2023, when Salah Eddine Zouitni, Aboubaker and Mahmoud realized that there was a gap in the market for a simple and effective tool that could help job seekers showcase their skills and achievements. They decided to use their expertise in web development, design and marketing to create a platform that would allow users to choose from various templates, customize them with their own information and download them as PDF files. InfinityScriptCV aims to make resume writing easy, fun and rewarding for everyone.</p>
                </div>
            </div>
            <div className="flex sm:flex-row flex-col gap-10 justify-center items-center flex-col-reverse">
                <div className="w-1/3">
                    <img src="future.png" alt="prologue" />
                </div>
                <div className="sm:w-1/2 p-3">
                    <h3 class="text-3xl font-bold mb-3 text-center">What's Next</h3>
                    <p className="text-center text-gray-500">The story continues, its pages yet unwritten. We're committed to evolving alongside your career journey, and our next chapters hold exciting additions:<br/>

                    <b>Diverse Templates for Diverse Voices:</b> We're expanding our collection to embrace more industries, styles, and personalities, ensuring you'll find a design that resonates with your unique brand.<br/>

                    <b>Global Reach, Local Touch:</b> We're breaking linguistic barriers by introducing support for more languages, ensuring your story is heard and understood across borders.
                    </p>
                </div>
            </div>
        </div>
    )
}
export default About