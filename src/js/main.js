import { lessons } from "./lessons";
import { modulesDetails } from "./modulesDetails";
import {
  countSeconds,
  countMinutesAndHours,
  getTotalDuration,
} from "../helpers";

{
  function getSecondsForModules(modulesDetails, lessons) {
    lessons.map((lesson) => {
      const { name, length } = lesson;

      modulesDetails.forEach((module) => {
        if (name.startsWith(module.prefix)) {
          const { seconds } = module;
          const oneLessonLength = countSeconds(length);
          module.seconds = oneLessonLength + seconds;
        }
      });
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
      .map((module, i) => {
        const { title, tutor, hours, minutes, percent } = module;

        return `<li class="list"><span class="list__title">${title}</span><span class="list__text">
          done by <span class="list__tutor">${tutor}</span> takes ${hours} hours & ${minutes} minutes ${
          i === 0 ? "!" : `- ${percent} % of the total course!`
        } </span>
      </li>`;
      })
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
