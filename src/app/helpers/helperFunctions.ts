import { inject, Injectable, NgZone } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class helperFunctions {
  private firestore: Firestore = inject(Firestore);
  private ngZone: NgZone = inject(NgZone); // Inject Angular's NgZone

  allProjects: any[] = [];
  allClients: any[] = [];

  async getClients() {
    return this.ngZone.run(async () => {
      try {
        const clientCollection = collection(this.firestore, 'Clients Review');
        const querySnapshot = await getDocs(clientCollection);

        const clients = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        this.allClients = clients; // Store fetched data
        return clients;
      } catch (error) {
        console.error('Error fetching clients:', error);
        return [];
      }
    });
  }

  async getProjects() {
    return this.ngZone.run(async () => {
      try {
        const projectCollection = collection(this.firestore, 'Projects');
        const querySnapshot = await getDocs(projectCollection);

        const projects = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        this.allProjects = projects;
        return projects;
      } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
      }
    });
  }

  applyFilter(type: string) {
    if (type === 'web' || type === 'graphics') {
      return this.allProjects.filter((project: any) => project.type === type);
    } else {
      return [...this.allProjects]; // Reset to show all projects
    }
  }
}
