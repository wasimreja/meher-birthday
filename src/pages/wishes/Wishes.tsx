import "./Wishes.css";

import { useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";
import { usePalette } from "@roylee1997/react-palette";

import Progress from "../../components/Progress/Progress";
import MusicCard from "../../components/MusicCard/MusicCard";
import TMessagesData from "../../typings/MessagesData";

// albumArts
import firstAlbumArt from "../../assets/albumArts/you-re-gonna-live-forever-in-me.png";
import secondAlbumArt from "../../assets/albumArts/apocalypse.png";

// musicFilePaths
import firstMusic from "../../assets/music/you-re-gonna-live-forever-in-me.mp3";
import secondMusic from "../../assets/music/apocalypse.mp3";

// framer transition and variants
const commonTransition = {
  ease: [0.43, 0.13, 0.23, 0.96],
  duration: 0.5,
};

const messageContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96],
      duration: 0.5,
    },
  },
};

const messages = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const sampleMessagesDataArray: TMessagesData[] = [
  {
    albumArt: firstAlbumArt,
    musicName: "You're Gonna Live Forever in Me - John Mayer",
    messageInParas: [
      "Meher, Happy Birthday, beautiful soul. Another year older, and you're still as dazzling as ever. May your day be filled with giggles, sweet treats and endless joy. Just like cupcake with sprinkles, your presence adds a sprinkle of happiness to my life.",
      "Since I met you, I've felt abandoned without your nearness; your nearness is all I ever dream of, the only thing. I can't wait to do all the little things with you. I want to buy groceries with you. I want to wake up beside you, to feel your hair tangled in the sheets and the morning sun slipping across your face. I want to bring you breakfast, burnt toast or eggs cooked just a little too long, while you give me that sleepy smile that makes everything feel like home. I want to sit in a tea stall with you, I want to lean in close, the hum of city streets around us, and just talk, about everything and nothing. I want to live out every little absurd dream, every broken, unfinished promise, and then make new ones, knowing we’ll try to keep them this time.",
    ],
    musicFilePath: firstMusic,
  },
  {
    albumArt: secondAlbumArt,
    musicName: "Apocalypse - Cigarettes After Sex",
    messageInParas: [
      "There are days when I look at you, and the world goes quiet. Every sound fades, every movement slows, and there’s nothing, nothing but you. It feels as though the universe itself pauses to witness what you and I have, as if even time respects the gravity of what we share.",
      "Perhaps it isn’t love when I say you are what I love the most – you are the knife I turn inside myself; my love for you runs so deep it cuts me. It's a wound I cherish, a pain that keeps me alive because it reminds me of you, of how fiercely, how madly, you have loved me.",
      "I want to hold you until the day of the apocalypse, until we have given every piece of ourselves to each other. You are the fire in my blood, and the summer in my lungs. You are the storm and the calm after it. When you love me, I feel as though I am standing at the edge of the universe, staring into eternity with you by my side.",
    ],
    musicFilePath: secondMusic,
  },
];

const Wishes = () => {
  const navigate = useNavigate();
  const { id = 0 } = useParams();

  if (Number(id) < 0 || sampleMessagesDataArray[Number(id)] == undefined) {
    return <p>Invalid Wish Message Id</p>;
  }

  const {
    data: colorData,
    loading: colorDataIsLoading,
    error,
  } = usePalette(sampleMessagesDataArray[Number(id)].albumArt);

  if (error) {
    return <h1>Invalid Wish Message Id</h1>;
  }

  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      className="wishes-wrapper h-screen w-screen flex flex-col justify-between items-center"
    >
      <Progress
        primaryColor={colorData?.vibrant}
        secondaryColor={colorData?.darkVibrant}
        messageDataArrayLength={sampleMessagesDataArray.length}
      />
      <motion.div
        className="lg:w-11/12 rounded-t-2xl md:rounded-t-xl flex md:flex-row flex-col-reverse"
        style={{
          backgroundColor: colorDataIsLoading ? "#fff" : colorData?.vibrant,
        }}
        initial={{ y: "1000px" }}
        animate={{ y: "0px" }}
        exit={{ y: "1000px" }}
        transition={commonTransition}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.x > 50) {
            if (Number(id) > 0 && Number(id) < sampleMessagesDataArray.length) {
              navigate(`/wishes/${Number(id) - 1}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          } else if (info.offset.x < -50) {
            if (
              Number(id) >= 0 &&
              Number(id) < sampleMessagesDataArray.length - 1
            ) {
              navigate(`/wishes/${Number(id) + 1}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          } else {
            console.log(null);
          }
        }}
      >
        <motion.div
          className="md:w-1/2"
          initial="hidden"
          animate="show"
          variants={messageContainer}
        >
          {sampleMessagesDataArray[Number(id)].messageInParas.map(
            (eachPara, index) => {
              return (
                <motion.p
                  className="p-8 message text-3xl"
                  variants={messages}
                  key={index + 2045}
                >
                  {eachPara}
                </motion.p>
              );
            }
          )}
        </motion.div>
        <div className="md:w-1/2 h-1/2 md:h-auto flex justify-center items-center">
          <MusicCard
            albumArt={sampleMessagesDataArray[Number(id)].albumArt}
            primaryColor={colorData?.vibrant}
            musicName={sampleMessagesDataArray[Number(id)].musicName}
            musicFilePath={sampleMessagesDataArray[Number(id)].musicFilePath}
          />
        </div>
      </motion.div>
    </motion.main>
  );
};

export default Wishes;
