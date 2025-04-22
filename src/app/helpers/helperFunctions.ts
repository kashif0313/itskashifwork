import { inject, Injectable, NgZone } from '@angular/core';
import {
  collection,
  DocumentData,
  Firestore,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class helperFunctions {
  private firestore: Firestore = inject(Firestore);
  private ngZone: NgZone = inject(NgZone); // Inject Angular's NgZone

  allProjects: any[] = [];
  allClients: any[] = [];

  lastProjectDoc: QueryDocumentSnapshot<DocumentData> | null = null;
  lastClientDoc: QueryDocumentSnapshot<DocumentData> | null = null;

  async getClients() {
    return this.ngZone.run(async () => {
      try {
        const clientCollection = collection(this.firestore, 'Clients Review');
        const clientQuery = query(clientCollection, limit(10)); // 🔥 Limit to 10 records
        const querySnapshot = await getDocs(clientQuery);

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

  // async getProjects() {
  //   return this.ngZone.run(async () => {
  //     try {
  //       const projectCollection = collection(this.firestore, 'Projects');
  //       const querySnapshot = await getDocs(projectCollection);

  //       const projects = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       this.allProjects = projects;
  //       return projects;
  //     } catch (error) {
  //       console.error('Error fetching projects:', error);
  //       return [];
  //     }
  //   });
  // }

  async getProjects(pageSize = 10, loadMore = false) {
    return this.ngZone.run(async () => {
      try {
        const projectCollection = collection(this.firestore, 'Projects');
        let projectQuery = query(
          projectCollection,
          orderBy('timestamp', 'desc'),
          limit(pageSize)
        );

        if (loadMore && this.lastProjectDoc) {
          projectQuery = query(
            projectCollection,
            orderBy('timestamp', 'desc'),
            startAfter(this.lastProjectDoc),
            limit(pageSize)
          );
        }

        const querySnapshot = await getDocs(projectQuery);

        if (!querySnapshot.empty) {
          this.lastProjectDoc =
            querySnapshot.docs[querySnapshot.docs.length - 1]; // Store last document
        }

        const projects = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (loadMore) {
          this.allProjects = [...this.allProjects, ...projects]; // Append new data
        } else {
          this.allProjects = projects; // Initial load
        }

        return projects;
      } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
      }
    });
  }

  applyFilter(type: string) {
    if (type === 'web' || type === 'graphic') {
      return this.allProjects.filter((project: any) => project.type === type);
    } else {
      return [...this.allProjects]; // Reset to show all projects
    }
  }
}
