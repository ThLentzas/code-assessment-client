import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  saveItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: string) {
    return localStorage.getItem(key)
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clearAll() {
    localStorage.clear();
  }
}
