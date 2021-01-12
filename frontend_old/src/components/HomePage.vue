<template>
  <div>
    <section
      class="container z-50 h-screen px-6 pt-10 max-w-7xl md:pt-40 md:ml-32"
    >
      <div
        class="relative z-50 flex flex-col items-center justify-center w-full text-center text-gray-100 md:w-2/5 md:items-start md:text-left"
      >
        <h1 class="z-50 text-5xl font-extrabold text-left md:text-6xl">
          <span class="block"><strong>S</strong>patial</span>
          <span class="block"><strong>I</strong>nteraction</span>
          <span class="block"><strong>D</strong>ecision</span>
          <span class="block"><strong>A</strong>nalytics</span>
        </h1>

        <!--
            <p class="mt-4 mb-8 text-2xl leading-normal">
                Sensing, Interpreting, Deciding and Acting
            </p>
        -->

        <router-link
          class="z-50 px-8 py-4 mx-4 mt-5 mb-2 font-bold text-white transition duration-300 ease-in-out transform rounded-full shadow-lg lg:mx-1 hover:underline focus:outline-none focus:shadow-outline hover:scale-105 motion-reduce:transition-none motion-reduce:transform-none"
          :to="{ name: 'Flow Model', params: { name: 123 } }"
          style="background-color: #4717f6"
        >
          Run Model
        </router-link>

        <a
          class="z-50 px-8 py-4 mx-4 mt-5 mb-2 font-bold text-white transition duration-300 ease-in-out transform rounded-full shadow-lg lg:mx-1 hover:underline focus:outline-none focus:shadow-outline hover:scale-105 motion-reduce:transition-none motion-reduce:transform-none"
          href="#scrollMarker"
          style="background-color: #4717f6"
        >
          Learn More
        </a>
      </div>

      <div class="flex flex-col items-center w-full h-full">
        <div
          id="network"
          class="absolute z-0 p-16 overflow-hidden bottom-14 md:top-48 md:right-20 lg:right-40"
          style="height: 500px; width: 500px; clip-path: circle(50% at 50% 50%)"
        ></div>
      </div>
    </section>

    <div class="absolute inset-x-0 bottom-0 w-screen h-32 md:mt-16">
      <a href="#scrollMarker" id="scrollMarker">
        <div class="flex flex-col items-center p-6 mb-5 arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </a>
    </div>

    <section
      id="wwd"
      class="container px-6 max-w-7xl text-gray-100 my-4 md:my-0.5"
    >
      <h2 class="p-4 text-4xl font-bold tracking-wide">
        What we do<strong>.</strong>
      </h2>

      <div
        class="flex-col md:flex md:flex-row md:items-start md:justify-start md:flex-nowrap"
      >
        <p class="p-4 text-xl font-medium leading-relaxed md:flex-grow">
          Bacon ipsum dolor amet kevin capicola alcatra, andouille porchetta
          landjaeger beef corned beef pancetta cupim flank sirloin pastrami
          tenderloin pig. Rump burgdoggen tongue beef ribs meatball bresaola
          chislic flank strip steak bacon. Biltong meatball kevin filet mignon
          flank pork chop picanha.
        </p>

        <img
          src="https://via.placeholder.com/500x300.png/09/fff"
          class="mx-auto my-4 md:my-0 md:relative md:mx-12"
        />
      </div>
    </section>

    <section class="container z-50 px-6 my-4 text-gray-100 max-w-7xl">
      <h2 class="p-4 text-4xl font-bold tracking-wide">
        How we do it<strong>.</strong>
      </h2>

      <p class="p-4 text-xl font-medium leading-relaxed">
        Meatball pork chop ribeye, jerky porchetta turducken tail buffalo
        frankfurter chicken turkey burgdoggen shank. Sirloin turkey pork chop
        spare ribs, corned beef cupim frankfurter andouille buffalo ground round
        meatloaf boudin. Porchetta jowl chicken spare ribs capicola beef pork
        chop brisket t-bone filet mignon buffalo shankle pastrami. Bresaola pig
        jerky andouille brisket. Do sunt pork esse, bresaola spare ribs in aute
        duis chislic. Frankfurter pancetta buffalo, id sirloin est andouille
        venison. Nostrud pig commodo shank enim cupim ut salami consectetur
        short ribs incididunt turducken laborum spare ribs.
      </p>
    </section>

    <hr class="my-4" />

    <section
      id="examples"
      class="container z-50 px-6 my-4 text-gray-100 max-w-7xl"
    >
      <h2 class="p-4 text-4xl font-bold tracking-wide">
        Examples<strong>:</strong>
      </h2>

      <div
        class="flex flex-col w-full p-3 py-10 mx-auto md:flex-row md:flex-wrap"
      >
        <div
          class="relative flex flex-col justify-between flex-initial flex-grow p-4 m-2 transition duration-300 ease-in-out transform shadow-lg md:w-1/3 bg-grey-400 rounded-2xl hover:shadow-2xl hover:-translate-y-1 hover:scale-102"
          style="background-color: #241c38"
        >
          <h4 class="text-3xl font-bold leading-normal text-center">Lugano</h4>

          <img
            class="w-full p-5 mx-auto mt-3 sm:h-64"
            src="https://via.placeholder.com/450x300.png/09/fff"
          />

          <p class="text-xl leading-loose text-left">
            Beef frankfurter tail, shankle porchetta corned beef kielbasa kevin
            drumstick tri-tip ham hock. Turducken salami short ribs chicken
            tri-tip shoulder. Kevin beef salami burgdoggen cupim.
          </p>
        </div>

        <div
          class="relative flex flex-col justify-between flex-initial flex-grow p-4 m-2 transition duration-300 ease-in-out transform shadow-lg md:w-1/3 bg-grey-400 rounded-2xl hover:shadow-2xl hover:-translate-y-1 hover:scale-102"
          style="background-color: #241c38"
        >
          <h4 class="text-3xl font-bold leading-normal text-center">
            California
          </h4>

          <img
            class="w-full p-5 mx-auto mt-3 sm:h-64"
            src="https://via.placeholder.com/450x300.png/09/fff"
          />

          <p class="text-xl leading-loose text-left">
            Pork venison picanha pig, chicken brisket cupim spare ribs porchetta
            turkey meatball burgdoggen fatback. Chuck ham ham hock prosciutto
            shoulder tail salami tri-tip short ribs.
          </p>
        </div>

        <div
          class="relative flex flex-col justify-between flex-initial flex-grow p-4 m-2 transition duration-300 ease-in-out transform shadow-lg md:w-1/3 bg-grey-400 rounded-2xl hover:shadow-2xl hover:-translate-y-1 hover:scale-102"
          style="background-color: #241c38"
        >
          <h4 class="text-3xl font-bold leading-normal text-center">
            Sandefjord
          </h4>

          <img
            class="w-full p-5 mx-auto mt-3 sm:h-64"
            src="https://via.placeholder.com/450x300.png/09/fff"
          />

          <p class="text-xl leading-loose text-left">
            Brisket fatback filet mignon buffalo t-bone spare ribs. Burgdoggen
            venison pork belly short ribs turducken cow. Buffalo cupim ham
            chislic bresaola tongue.
          </p>
        </div>

        <div
          class="relative flex flex-col justify-between flex-initial flex-grow p-4 m-2 transition duration-300 ease-in-out transform shadow-lg md:w-1/3 bg-grey-400 rounded-2xl hover:shadow-2xl hover:-translate-y-1 hover:scale-102"
          style="background-color: #241c38"
        >
          <h4 class="text-3xl font-bold leading-normal text-center">Danmark</h4>

          <img
            class="w-full p-5 mx-auto mt-3 sm:h-64"
            src="https://via.placeholder.com/450x300.png/09/fff"
          />

          <p class="text-xl leading-loose text-left">
            Tail flank prosciutto landjaeger rump, bresaola leberkas biltong
            beef pancetta alcatra cupim bacon porchetta. Swine pork loin sirloin
            ground round.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>