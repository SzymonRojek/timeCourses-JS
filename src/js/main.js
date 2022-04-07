import { lessons } from "./lessons";
import { modulesDetails } from "./modulesDetails";
import { countMinutesAndHours, getDuration } from "../helpers";

{
  function totalDuration(finalData, lessons) {
    const totalDuration = getDuration(lessons);

    finalData.forEach(({ prefix, seconds, minutes, hours, percent }) => {
      const module = lessons.filter(({ name }) => name.startsWith(prefix));
      const durationModule = getDuration(module);
      const [minutesModule, hoursModule] = countMinutesAndHours(durationModule);
      const percentagePerModule = Math.trunc(
        (durationModule / totalDuration) * 100
      );

      seconds = durationModule;
      minutes = minutesModule;
      hours = hoursModule;
      percent = percentagePerModule;
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
    totalDuration(modulesDetails, lessons);
    renderText(modulesDetails);
  };

  init();
}
