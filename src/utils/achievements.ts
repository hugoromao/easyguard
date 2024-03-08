/* eslint-disable no-unused-vars */
import dayjs from "dayjs";

import { HistoryItem } from "../context/global";

function getTotalPasswordsCreated(history: HistoryItem[]) {
  return history.reduce(
    (acc, cur) => (cur.type === "password" ? acc + 1 : acc),
    0
  );
}

function getTotalConsecutiveDiff(history: HistoryItem[], date: "day" | "week") {
  if (history.length === 0) return 0;

  let totalConsecutives = 0;
  let currentConsecutives = 1;

  for (let i = 1; i < history.length; i++) {
    const currentDate = dayjs(history[i].createdAt);
    const previousDate = dayjs(history[i - 1].createdAt);

    if (currentDate.diff(previousDate, date) === 1) {
      currentConsecutives++;
    } else {
      totalConsecutives = Math.max(totalConsecutives, currentConsecutives);
      currentConsecutives = 1;
    }
  }

  return Math.max(totalConsecutives, currentConsecutives);
}

function getTotalDayByPartOfTheDay(history: HistoryItem[]) {
  let morningCounter = 0;
  let nightCounter = 0;

  if (history.length === 0) return { morningCounter, nightCounter };

  history.forEach(({ createdAt }) => {
    const hour = dayjs(createdAt).hour();
    if (hour >= 18 || hour < 6) {
      nightCounter += 1;
    }

    if (hour >= 6 && hour < 12) {
      morningCounter += 1;
    }
  });

  return { morningCounter, nightCounter };
}

function getTotalAtFriday(history: HistoryItem[]) {
  let counter = 0;
  if (history.length === 0) return 0;

  history.forEach(({ createdAt }) => {
    if (dayjs(createdAt).day() === 5) {
      counter += 1;
    }
  });
  return counter;
}

export type Badge = {
  image: {
    url: string;
    smallUrl: string;
    blurredUrl: string;
    pixelated: string;
    alt: string;
  };
};

export type Achivement = {
  id: number;
  title: string;
  description: string;
  badge: Badge;
  activationFunction: (
    history: HistoryItem[],
    completedAchievements: number[]
  ) => boolean;
  getProgress: (
    history: HistoryItem[],
    completedAchievements: number[]
  ) => number;
};

export const achievements: Achivement[] = [
  {
    id: 1,
    title: "O início da jornada!",
    description: "Crie sua primeira senha.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) > 0;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) / 1;
    },
    badge: {
      image: {
        url: "/badges/1.jpg",
        smallUrl: "/badges/small-1.jpg",
        pixelated: "/badges/pixel-1.jpg",
        blurredUrl:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAKAAoDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0BPGL7h+9Pb0/PpjpX5os3/v/AJf1/WhwvKFyv3fzLH/CYt/z2P5D/Cr/ALXX87+//gHL/ZT/AJPxPIl+8K+Ojv8AI+zsvzLQ6D6CtTnA/9k=",
        alt: "Um sapo montado em uma capivara em um campo de flores.",
      },
    },
  },
  {
    id: 2,
    title: "Pegando o jeito",
    description: "Crie 10 senhas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) >= 10;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) / 10;
    },
    badge: {
      image: {
        url: "/badges/2.jpg",
        smallUrl: "/badges/small-2.jpg",
        pixelated: "/badges/pixel-2.jpg",
        blurredUrl:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAKAAoDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5p0q+kjTIuMc+3rz2/D/Gv5WrUlZ6fmd2Oqxkn7uy+46ca1IAP9KPQdl/wrh9j5fieC7Xfur7jzC1J8vqfz969etv8v0PQxO0vn+RbBOByegrhPLuwP/Z",
        alt: "Um sapo caminhando fantasiado de vaqueiro em uma floresta.",
      },
    },
  },
  {
    id: 3,
    title: "Só mais um pouquinho",
    description: "Crie 20 senhas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) >= 20;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) / 20;
    },
    badge: {
      image: {
        url: "/badges/3.jpg",
        smallUrl: "/badges/small-3.jpg",
        pixelated: "/badges/pixel-3.jpg",
        blurredUrl:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAKAAoDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDmf2Xvil4t07VdG8NeL9V0HWdN8X+HvFVvoEkHxGsvBuuDxvp2nx3Pg/TNFm1fwD4r8EXt14k1yW18LXGleN9e8PwNDJdXL6x4SL2Xiix/n/L+H+H6+WfXc0jSk8ZQxFXB1qeKxLo0o0lUlHnlSp0FRxFP92sXhsRzpVZU6NGqo1FVn+l4vIsRhMbi8t9nVljsDWpU69OpS5YSjObiqlCEZ+3xGHqK1SliMPdunzzdKbj7J/U8v7VnwZsZJLLVtfu7HVbN3tdTso9MuruOz1C3YxXtql0qxLcpb3KSQrcLFGsyoJAiBto/Pa2QVKNarS+t4eXsqk6fNGNdxlySceaL9lqna6fY+dakm1yy0bXbbyk1JejSa6pPQ/O7/gnJqepTfFrQ7KXUL6WzeKS3e0ku53tnt7i4g+0QNA0hiaGfYnnRFCku1d6ttGOvielShhq3LTpx/fqXuwiveUalnot1fR7n9NYCrUk8POVScp+wkuaU5OVueCtzN3tbpc/Y+e/vmmmZr27ZmlkLMbiYkkuSSSXySTySeSa+FSVlotke86dNttwg29W3GN2/uP/Z",
        alt: "default badge image",
      },
    },
  },
  {
    id: 4,
    title: "Produção em massa",
    description: "Crie 30 senhas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) >= 30;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) / 30;
    },
    badge: {
      image: {
        url: "/badges/default.jpg",
        smallUrl: "/badges/default.jpg",
        pixelated: "/badges/pixel-0.jpg",
        blurredUrl:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAKAAoDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQSWy8sfuY/wDx71/3vr/9evr9fXuf5IKVO3wrX1f6/wCRnGWyyf3MXU9m9f8Afp/10MXOnd+6jCVm8n7zdT3PvT6r+uxim7bvb/Molmz95vzNI5m3d6v72P/Z",
        alt: "default badge image",
      },
    },
  },
  {
    id: 5,
    title: "Tchau! hackers",
    description: "Crie 50 senhas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) >= 50;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) / 50;
    },
    badge: {
      image: {
        url: "/badges/default.jpg",
        smallUrl: "/badges/default.jpg",
        pixelated: "/badges/pixel-0.jpg",
        blurredUrl:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAKAAoDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQSWy8sfuY/wDx71/3vr/9evr9fXuf5IKVO3wrX1f6/wCRnGWyyf3MXU9m9f8Afp/10MXOnd+6jCVm8n7zdT3PvT6r+uxim7bvb/Molmz95vzNI5m3d6v72P/Z",
        alt: "default badge image",
      },
    },
  },
  {
    id: 6,
    title: "Hábitos seguros",
    description: "Use a plataforma por 3 dias consecutivos",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") >= 3;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") / 3;
    },
    badge: {
      image: {
        url: "/badges/default.jpg",
        smallUrl: "/badges/default.jpg",
        pixelated: "/badges/pixel-0.jpg",
        blurredUrl:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAKAAoDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQSWy8sfuY/wDx71/3vr/9evr9fXuf5IKVO3wrX1f6/wCRnGWyyf3MXU9m9f8Afp/10MXOnd+6jCVm8n7zdT3PvT6r+uxim7bvb/Molmz95vzNI5m3d6v72P/Z",
        alt: "default badge image",
      },
    },
  },
  {
    id: 7,
    title: "Persistente que chama?",
    description: "Use a plataforma por 5 dias consecutivos",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") >= 5;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") / 5;
    },
    badge: {
      image: {
        url: "/badges/default.jpg",
        smallUrl: "/badges/default.jpg",
        pixelated: "/badges/pixel-0.jpg",
        blurredUrl:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAKAAoDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQSWy8sfuY/wDx71/3vr/9evr9fXuf5IKVO3wrX1f6/wCRnGWyyf3MXU9m9f8Afp/10MXOnd+6jCVm8n7zdT3PvT6r+uxim7bvb/Molmz95vzNI5m3d6v72P/Z",
        alt: "default badge image",
      },
    },
  },
  {
    id: 8,
    title: "Dedicação inabalável",
    description: "Use a plataforma por 7 dias consecutivos",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") >= 7;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") / 7;
    },
    badge: {
      image: {
        url: "/badges/default.jpg",
        smallUrl: "/badges/default.jpg",
        pixelated: "/badges/pixel-0.jpg",
        blurredUrl:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAKAAoDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQSWy8sfuY/wDx71/3vr/9evr9fXuf5IKVO3wrX1f6/wCRnGWyyf3MXU9m9f8Afp/10MXOnd+6jCVm8n7zdT3PvT6r+uxim7bvb/Molmz95vzNI5m3d6v72P/Z",
        alt: "default badge image",
      },
    },
  },
  {
    id: 9,
    title: "Já virou rotina!",
    description: "Use a plataforma por 10 dias consecutivos",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") >= 10;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") / 10;
    },
    badge: {
      image: {
        url: "/badges/default.jpg",
        smallUrl: "/badges/default.jpg",
        pixelated: "/badges/pixel-0.jpg",
        blurredUrl:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAKAAoDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQSWy8sfuY/wDx71/3vr/9evr9fXuf5IKVO3wrX1f6/wCRnGWyyf3MXU9m9f8Afp/10MXOnd+6jCVm8n7zdT3PvT6r+uxim7bvb/Molmz95vzNI5m3d6v72P/Z",
        alt: "default badge image",
      },
    },
  },
  {
    id: 10,
    title: "Segurança nunca é demais",
    description: "Use a plataforma por 3 semanas consecutivas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "week") >= 3;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "week") / 3;
    },
    badge: {
      image: {
        url: "/badges/default.jpg",
        smallUrl: "/badges/default.jpg",
        pixelated: "/badges/pixel-0.jpg",
        blurredUrl:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAKAAoDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQSWy8sfuY/wDx71/3vr/9evr9fXuf5IKVO3wrX1f6/wCRnGWyyf3MXU9m9f8Afp/10MXOnd+6jCVm8n7zdT3PvT6r+uxim7bvb/Molmz95vzNI5m3d6v72P/Z",
        alt: "default badge image",
      },
    },
  },
  {
    id: 11,
    title: "Consistência é a chave",
    description: "Use a plataforma por 5 semanas consecutivas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "week") >= 5;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "week") / 5;
    },
    badge: {
      image: {
        url: "/badges/default.jpg",
        smallUrl: "/badges/default.jpg",
        pixelated: "/badges/pixel-0.jpg",
        blurredUrl:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAKAAoDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQSWy8sfuY/wDx71/3vr/9evr9fXuf5IKVO3wrX1f6/wCRnGWyyf3MXU9m9f8Afp/10MXOnd+6jCVm8n7zdT3PvT6r+uxim7bvb/Molmz95vzNI5m3d6v72P/Z",
        alt: "default badge image",
      },
    },
  },
  {
    id: 12,
    title: "Sem parar!",
    description: "Use a plataforma por 10 semanas consecutivas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "week") >= 10;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "week") / 10;
    },
    badge: {
      image: {
        url: "/badges/default.jpg",
        smallUrl: "/badges/default.jpg",
        pixelated: "/badges/pixel-0.jpg",
        blurredUrl:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAKAAoDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQSWy8sfuY/wDx71/3vr/9evr9fXuf5IKVO3wrX1f6/wCRnGWyyf3MXU9m9f8Afp/10MXOnd+6jCVm8n7zdT3PvT6r+uxim7bvb/Molmz95vzNI5m3d6v72P/Z",
        alt: "default badge image",
      },
    },
  },
  {
    id: 13,
    title: "Acordando com os pássaros",
    description: "Crie três senhas no período da manhã",
    activationFunction: (history: HistoryItem[]) =>
      getTotalDayByPartOfTheDay(history).morningCounter >= 3,
    getProgress: (history: HistoryItem[]) => {
      return getTotalDayByPartOfTheDay(history).morningCounter / 3;
    },
    badge: {
      image: {
        url: "/badges/default.jpg",
        smallUrl: "/badges/default.jpg",
        pixelated: "/badges/pixel-0.jpg",
        blurredUrl:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAKAAoDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQSWy8sfuY/wDx71/3vr/9evr9fXuf5IKVO3wrX1f6/wCRnGWyyf3MXU9m9f8Afp/10MXOnd+6jCVm8n7zdT3PvT6r+uxim7bvb/Molmz95vzNI5m3d6v72P/Z",
        alt: "default badge image",
      },
    },
  },
  {
    id: 14,
    title: "Coruja noturna",
    description: "Crie três senhas no período da noite",
    activationFunction: (history: HistoryItem[]) =>
      getTotalDayByPartOfTheDay(history).nightCounter >= 3,
    getProgress: (history: HistoryItem[]) => {
      return getTotalDayByPartOfTheDay(history).nightCounter / 3;
    },
    badge: {
      image: {
        url: "/badges/default.jpg",
        smallUrl: "/badges/default.jpg",
        pixelated: "/badges/pixel-0.jpg",
        blurredUrl:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAKAAoDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQSWy8sfuY/wDx71/3vr/9evr9fXuf5IKVO3wrX1f6/wCRnGWyyf3MXU9m9f8Afp/10MXOnd+6jCVm8n7zdT3PvT6r+uxim7bvb/Molmz95vzNI5m3d6v72P/Z",
        alt: "default badge image",
      },
    },
  },
  {
    id: 15,
    title: "Sextou!",
    description: "Crie uma senha na sexta-feira",
    activationFunction: (history: HistoryItem[]) => !!getTotalAtFriday(history),
    getProgress: (history: HistoryItem[]) => {
      return getTotalAtFriday(history) > 1 ? 100 : 0;
    },
    badge: {
      image: {
        url: "/badges/default.jpg",
        smallUrl: "/badges/default.jpg",
        pixelated: "/badges/pixel-0.jpg",
        blurredUrl:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAKAAoDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQSWy8sfuY/wDx71/3vr/9evr9fXuf5IKVO3wrX1f6/wCRnGWyyf3MXU9m9f8Afp/10MXOnd+6jCVm8n7zdT3PvT6r+uxim7bvb/Molmz95vzNI5m3d6v72P/Z",
        alt: "default badge image",
      },
    },
  },
  {
    id: 16,
    title: "Topo do mundo",
    description: "Complete todas as conquistas",
    activationFunction: (_, completedAchievements: number[]) =>
      completedAchievements.length === achievements.length,
    getProgress: (_, completedAchievements: number[]) => {
      return completedAchievements.length / achievements.length;
    },
    badge: {
      image: {
        url: "/badges/default.jpg",
        smallUrl: "/badges/default.jpg",
        pixelated: "/badges/pixel-0.jpg",
        blurredUrl:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAKAAoDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQSWy8sfuY/wDx71/3vr/9evr9fXuf5IKVO3wrX1f6/wCRnGWyyf3MXU9m9f8Afp/10MXOnd+6jCVm8n7zdT3PvT6r+uxim7bvb/Molmz95vzNI5m3d6v72P/Z",
        alt: "default badge image",
      },
    },
  },
];
