// login details
// tipo4542@gmail.com
//

import PocketBase from "pocketbase";

export const pb = new PocketBase("http://127.0.0.1:8090");

// checks if a user is logged in
export const isUserLoggedIn = () => {
  return pb.authStore.isValid;
};

// check verified status
export async function checkVerifyStatus() {
  if (pb.authStore.isValid) {
    await pb.collection("users").authRefresh();
    // await pb.collection("host").authRefresh();
    return pb.authStore.record?.verified || false;
  }
}

// create host
export async function createHost(
  email,
  password,
  passwordConfirm,
  firstname,
  lastname,
  phone
) {
  const data = {
    email: email,
    emailVisibility: true,
    password: password,
    passwordConfirm: passwordConfirm,
    firstname: firstname,
    lastname: lastname,
    phone: phone,
  };
  const record = await pb.collection("users").create(data);
  //   const record = await pb.collection("host").create(data);
  //   await pb.collection("medofficer").requestVerification(email);
  return record;
}

// login host
export const loginHost = async (email, password) => {
  const record = await pb.collection("users").authWithPassword(email, password);
  // const record = await pb.collection("users").authWithOTP(email, password);
  // const record = await pb.collection("host").authWithPassword(email, password);
  return record;
};

// view host info
export async function hostInfo() {
  const id = pb.authStore.record.id;
  const record = await pb.collection("users").getOne(id);
  //   const record = await pb.collection("host").getOne(id);
  return record;
}

// create event
export async function createEvent(data) {
  if (data instanceof FormData) {
    data.append("creator", pb.authStore.record?.id);
  } else if (typeof data === "object") {
    data.creator = pb.authStore.record?.id;
  }
  const record = await pb.collection("events").create(data);
  return record;
}

// add ticket type
export async function addTicketTypes(ticketName1, ticketPrice1, ticketQuantity1, earlyBirdPrice1, description1, creator) {
  const data = {
    ticketName1: ticketName1,
    ticketPrice1: ticketPrice1,
    ticketQuantity1: ticketQuantity1,
    earlyBirdPrice1: earlyBirdPrice1,
    description1: description1,
    creator: creator
};
const record = await pb.collection("tickets").create(data);
  return record;
}

// list all avaible events
// export async function listEvents() {
//   const record = await pb.collection("events"). ;
//   return record;
// }

//  view event info
export async function event_info() {
  const userId = pb.authStore.record.id;

  const record = await pb.collection("events").getFullList({
    filter: `creator = "${userId}"`,
  });
  return record;
}

// view event info by id
export async function getSingleEvent(id) {
  const record = await pb.collection("events").getOne(id);
  return record;
}

// edit event
export async function updateEvent(id, data) {
  if (data instanceof FormData) {
    data.append("creator", pb.authStore.record?.id);
  } else if (typeof data === "object") {
    data.creator = pb.authStore.record?.id;
  }
  const record = await pb.collection("events").update(id, data);
  return record;
}

// delete event record
export async function deleteEvent(id) {
  const record = await pb.collection("events").delete(id);
  return record;
}

// logout
export function logout() {
  pb.authStore.clear();
}

// delete account
export async function deleteAccount() {
  const id = pb.authStore.record.id;
  const record = await pb.collection("users").delete(id);
  //   const record = await pb.collection("host").delete(id);
  return record;
}
