const Hero = () => {
  return (
    <section className="py-12 lg:py-24">
      <div className="max-w-[130rem] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <p className="text-5xl font-extrabold leading-relaxed mb-5 drop-shadow-lg">
            Your Personalized Life Assistant, Powered by AI
          </p>
          <p className="text-base text-gray-600">
            Transform your daily life with HomeAI. Turn any ingredients into
            recipes, match workouts to your goals, and master your finances.
          </p>
        </div>
        {/* <p className="text-lg text-gray-600">
          HomeAI transforms your everyday life by offering smart, personalized
          solutions tailored just for you. Turn random ingredients into
          delicious recipes, get custom workout routines based on your equipment
          and goals, and take control of your finances with intelligent budget
          planning.
          <br />
          Whether you&apos;re standing in front of an open fridge, planning your
          fitness journey, or managing your monthly expenses, HomeAI adapts to
          your needs, delivering practical solutions in seconds. Stop following
          one-size-fits-all advice. Let HomeAI create personalized
          recommendations that fit your unique lifestyle, resources, and goals
        </p> */}
      </div>
    </section>
  );
};

export default Hero;
