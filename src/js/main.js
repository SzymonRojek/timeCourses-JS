import { lessons } from "./lessons";
import { countSeconds } from "../helpers/countSeconds";
import { countMinutesAndHours } from "../helpers/countMinutesAndHours.js";
import { getTotalDuration } from "../helpers/getTotalDuration";
import { modulesDetails } from "./modulesDetails";

{
  function getSecondsForModules(modulesDetails, lessons) {
    lessons.forEach((lesson) => {
      const { name, length } = lesson;

      for (const module of modulesDetails) {
        let { seconds } = module;

        if (name.startsWith(module.prefix)) {
          const oneLessonLength = countSeconds(length);
          module.seconds = seconds += oneLessonLength;
        }
      }
    });
  }

  function getHoursAndMinutesModules(modulesDetails) {
    modulesDetails.forEach((module) => {
      const [minutes, hours] = countMinutesAndHours(module.seconds);
      module.minutes = minutes;
      module.hours = hours;
    });
  }

  function getTotalAndPercentage(modulesDetails, lessons) {
    const totalDuration = getTotalDuration(lessons);
    const [minutes, hours] = countMinutesAndHours(totalDuration);

    modulesDetails.forEach((module) => {
      if (module.prefix === "all") {
        module.seconds = module.seconds + totalDuration;
        module.minutes = minutes;
        module.hours = hours;
      }

      const percentagePerModule = Math.trunc(
        (module.seconds / totalDuration) * 100
      );

      module.percent = module.percent + percentagePerModule;
    });
  }

  const renderText = (finalData) => {
    const messageToHtml = finalData
      .map(
        (module) =>
          `<li class="list"><span class="list__title">${module.title}</span><span class="list__text">
          done by ${module.tutor} takes ${module.hours} hours & ${module.minutes} minutes - it is ${module.percent} % of the course!</span>
      </li>`
      )
      .join("");

    const messageElement = document.querySelector(".js-message");
    messageElement.innerHTML = messageToHtml;
  };

  const init = () => {
    getSecondsForModules(modulesDetails, lessons);
    getHoursAndMinutesModules(modulesDetails);
    getTotalAndPercentage(modulesDetails, lessons);

    renderText(modulesDetails);
  };

  init();
}
