import { lessons } from "./lessons";
import { modulesDetails } from "./modulesDetails";
import { countMinutesAndHours, getDuration } from "../helpers";

{
  function totalDuration(finalData, lessons) {
    const totalDuration = getDuration(lessons);

    finalData.forEach((data) => {
      const module = lessons.filter(({ name }) => name.startsWith(data.prefix));
      const durationModule = getDuration(module);
      const [minutes, hours] = countMinutesAndHours(durationModule);
      const percentagePerModule = Math.trunc(
        (durationModule / totalDuration) * 100
      );

      data.seconds = durationModule;
      data.minutes = minutes;
      data.hours = hours;
      data.percent = percentagePerModule;
    });
  }

  const renderText = (finalData) => {
    const messageToHtml = finalData
      .map((module, i) => {
        const { title, tutor, hours, minutes, percent } = module;

        return `
            <li class="list">
              <p class="list__title">${title}
              <span class="list__text">done by <span class="list__tutor">${tutor}</span> 
              takes ${hours} hours & ${minutes} minutes
              ${i === 0 ? "" : ` - ${percent} % of the total course`}!</p>
            </li>
        `;
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
