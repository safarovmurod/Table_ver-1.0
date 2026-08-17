import axios from "axios";
import { api } from "../data/data";


export async function getUsers(page, limit) {
  try {
    const res = await axios.get(api, { params: { page, limit } });
    return res.data;
  } catch (error) {
    return [];
  }
}
export async function searchUsers(textgit init, page, limit) {
  try {
    const res = await axios.get(api, { params: { search: text, page, limit } });
    return res.data;
  } catch (error) {
    return [];
  }
}
export async function selectUsers(category, level, page, limit) {
  try {
    const res = await axios.get(api, {
      params: {
        category: category || undefined,
        level: level || undefined,
        page,
        limit,
      },
    });
    return res.data;
  } catch (error) {
    return [];
  }
}
export async function countUsers(text, category, level) {
  try {
    const res = await axios.get(api, {
      params: {
        search: text || undefined,
        category: category || undefined,
        level: level || undefined,
      },
    });
    return res.data.length;
  } catch (error) {
    return 0;
  }
}
export async function addUser(newUser) {
  try {
    const res = await axios.post(api, newUser);
    return res.data;
  } catch (error) {
    return null;
  }
}
export async function editUser(id, user) {
  try {
    const res = await axios.put(api + "/" + id, user);
    return res.data;
  } catch (error) {
    return null;
  }
}
export async function deleteUser(id) {
  try {
    const res = await axios.delete(api + "/" + id);
    return res.data;
  } catch (error) {
    return null;
  }
}
