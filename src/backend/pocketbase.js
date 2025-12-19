// login details
// tipo4542@gmail.com
// 123412346

import PocketBase from "pocketbase";

// export const pb = new PocketBase("http://127.0.0.1:8090");

export const pb = new PocketBase("https://service-konnect.pockethost.io/");

// checks if a user is logged in
export const isUserLoggedIn = () => {
  return pb.authStore.isValid;
};

// check verified status
export async function checkVerifyStatus() {
  if (pb.authStore.isValid) {
    // await pb.collection("users").authRefresh();
    await pb.collection("host").authRefresh();
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
  // const record = await pb.collection("users").create(data);
    const record = await pb.collection("host").create(data);
  //   await pb.collection("medofficer").requestVerification(email);
  return record;
}

// login host
export const loginHost = async (email, password) => {
  // const record = await pb.collection("users").authWithPassword(email, password);
  // const record = await pb.collection("users").authWithOTP(email, password);
  const record = await pb.collection("host").authWithPassword(email, password);
  return record;
};

// view host info
export async function hostInfo() {
  const id = pb.authStore.record.id;
  // const record = await pb.collection("users").getOne(id);
    const record = await pb.collection("host").getOne(id);
  return record;
}

// update host info
export async function updateHost(id, data) {
  if (data instanceof FormData) {
    data.append("id", pb.authStore.record?.id);
  } else if (typeof data === "object") {
    data.id = pb.authStore.record?.id;
  }
  // const record = await pb.collection("users").update(id, data);
  const record = await pb.collection("host").update(id, data);
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
export async function addTicketType(ticketData) {
  const record = await pb.collection("tickets").create(ticketData);
  return record;
}

// list all events
export async function events_list () {
  const record = await pb.collection("events").getFullList();
  return record;
}

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

// view tickets info
export async function ticket_info() {
  const record = await pb.collection("tickets").getFullList();
  return record;
}

// view ticket info by id
export async function getSingleTicket(id) {
  const record = await pb.collection("tickets").getOne(id);
  return record;
}

// update ticket
export async function updateTicketSales(ticketId, amountToAdd) {
  const ticket = await pb.collection("tickets").getOne(ticketId);

  const record = await pb.collection("tickets").update(ticketId, {
    ticketSold: (ticket.ticketSold || 0) + amountToAdd,
  });

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
  // const record = await pb.collection("users").delete(id);
    const record = await pb.collection("host").delete(id);
  return record;
}